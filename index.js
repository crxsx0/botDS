const {GatewayIntentBits, Client, EmbedBuilder} = require('discord.js');
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});
const XLSX = require('xlsx');

const config = require('./config.json');
const { init } = require('./server.js');


require('./server.js');


const nombreTilla = []
const precioTilla = []
const fechaTilla = []
const fotoTilla = []
const snkrs = []
const linkTilla = []

function leerExcel(ruta){
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataEXcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    //console.log(dataEXcel)
    for (const itemFila of dataEXcel ){
      nombreTilla.push(itemFila['Nombre']);
      precioTilla.push(itemFila['Precio']);
      fechaTilla.push(itemFila['Fecha']);
      fotoTilla.push(itemFila['Foto']);
    }
    console.log('Archivo leido exitosamente');
};

function listaSNKRS (){
    for (i = 0; i < nombreTilla.length; i ++){
        snkrs.push(i +1 + '. ' + nombreTilla[i]);
    }
};

async function encenderBot () {
    //await init();
    setTimeout(() => {
        console.log('** Listo **');
        leerExcel('nike.xlsx')
    },500);;
    client.login(config.token);
}

encenderBot()

client.on('ready', () => {
    console.log('El bot esta disponible');
    listaSNKRS();
    const listt = String(snkrs.toString())
    console.log(snkrs);
    client.on('messageCreate', async (message) =>{
        if(message.author.bot) return

        const embed = new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[0] + '\n' + precioTilla[0] + '\n' + fechaTilla[0])
            .setThumbnail(fotoTilla[0])
        
            message.channel.send({ embeds: [embed] })
    });
})
