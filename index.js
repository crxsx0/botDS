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

const config = require('./config.json')

client.on('ready', () => {
    console.log('bot de mierda');
})

client.login(config.token);

const nombreTilla = []
const precioTilla = []

function leerExcel(ruta){
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;
    console.log(workbookSheets);
    const sheet = workbookSheets[0];
    const dataEXcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    //console.log(dataEXcel)
    for (const itemFila of dataEXcel ){
      nombreTilla.push(itemFila['Nombre']);
      precioTilla.push(itemFila['Precio']);
    }
};
  
leerExcel('nike.xlsx')

client.on('messageCreate', async (message) =>{
    if(message.author.bot) return
    message.channel.send(nombreTilla[0] + ' ' + precioTilla[0]);
});