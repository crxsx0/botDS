const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

//init esta la ejecucion de la extraccion de los datos class primaria
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
    await page.screenshot({path: 'example.png'});
    
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
            const precioProducto = document.querySelectorAll('.bestPrice');
            const fechaProducto = document.querySelectorAll('.fechafinal p');
            return nombreProducto[0].innerHTML +', '+ precioProducto[0].innerHTML +', '+ fechaProducto[0].innerHTML
        });

        tillas.push(snkrs);
    };

    console.log(tillas);
    console.log(tillas.length);
    console.log("listo");
    await browser.close();

}

init()




