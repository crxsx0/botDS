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

function leerExcel(ruta){
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataEXcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    //console.log(dataEXcel)
    for (const itemFila of dataEXcel ){
      nombreTilla.push(itemFila['Nombre']);
      precioTilla.push(itemFila['Precio']);
    }
    console.log('Archivo leido exitosamente');
};

async function encenderBot () {
    await init();
    setTimeout(() => {
        console.log('** Listo **');
        leerExcel('nike.xlsx')
    },500);;
    client.login(config.token);
}

encenderBot()

client.on('ready', () => {
    console.log('El bot esta disponible');
    client.on('messageCreate', async (message) =>{
        if(message.author.bot) return
        message.channel.send(nombreTilla[0] + ' ' + precioTilla[0]);
    });
})
