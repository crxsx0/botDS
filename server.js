const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const ExcelJS = require('exceljs');

//init esta la ejecucion de la extraccion de los datos class primaria
const saveExcel = (data) => {
    const workbook = new ExcelJS.Workbook()
    const fileName = 'nike.xlsx'
    const sheet = workbook.addWorksheet('Resultados')

    const reColumns = [
        {header: 'Nombre', key: 'name'},
        {header: 'Precio', key: 'price'},
        {header: 'Fecha', key: 'date'},
        {header: 'Foto', key: 'img'}
    ]

    sheet.columns = reColumns
    sheet.addRows(data)

    workbook.xlsx.writeFile(fileName).then((e) => {
        console.log('Guardado exitosamente');
    })

}

const init = async () => {
    const header = randomUseragent.getRandom();

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setUserAgent(header);
    await page.setViewport({width:1920, height: 1080});
    await page.goto('https://www.nike.cl/snkrs/futuros');
    await page.waitForSelector('.container');
    
// lista los links de cada elemento contenido
    const links = await page.evaluate(() => {
        const zapatilla = document.querySelectorAll('.datainfo a');

        const listaLinks = [];
        for (let i of zapatilla) {
            listaLinks.push(i.href);
        };

        return listaLinks
    });
    
//entra a cada links
    const tillas = []

    for (let link of links) {
        await page.goto(link);
        await page.waitForTimeout(13000);

        const snkrs = await page.evaluate(() => {
            const nombreProducto = document.querySelectorAll('.name-box h1'); 
            const fotoProducto = document.querySelectorAll('.thumbs img')
            const precioProducto = document.querySelectorAll('.bestPrice');
            const fechaProducto = document.querySelectorAll('.fechafinal p');
            return ({
                name: nombreProducto[0].innerHTML,
                price: precioProducto[0].innerHTML,
                date: fechaProducto[0].innerHTML,
                img: fotoProducto[0].getAttribute('src')
            })
        });

        tillas.push(snkrs);
    };

    console.log("listo");
    await browser.close();

    saveExcel(tillas);
}


init()




