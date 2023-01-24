const { Client, GatewayIntentBits, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const XLSX = require('xlsx');

const nombreTilla = []
const precioTilla = []

//funcion para leer archivo excel
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
}

leerExcel('nike.xlsx')

//npx nodemon index.js

client.on('ready', () => {
  console.log(`el servidor ${client.user.tag} esta listo!!!`);
  client.application.commands.set([
    {
        name: 'ping',
        description: 'pong',
        options: [],
    },
    
    {
        name: 'hola',
        description: 'chao', 
        options: [],
    },

    {
      name: 'info',
      description: 'informacion zapatillas',
      options: [],
  },
  ]);
});

client.on('interactionCreate', (inn) => {
  if (inn.isCommand() && inn.commandName === 'ping') {
    inn.reply('pong')
  } 

  if (inn.isCommand() && inn.commandName === 'hola') {
    inn.reply('chao')
  } 

  if (inn.isCommand() && inn.commandName === 'info') {
    /*const alert = new Discord.MessageEmbed
    .setTitle(nombreTilla[0])//titulo del msg
    .setAuthor(message.member.displayName, message.author.displayAvatarUrl())
    .setColor(0xE964ED)//color laterales
    //.setThumbnail()//es para poner un gif 
    .setDescription(precioTilla[0])//desdripcion de este contenido
    //podemos agregar mas contenido pero ahi vamos viendo*/
    inn.reply(nombreTilla[0] + ', ' + precioTilla[0])
  } 
});

//mensaje embed
client.on("message", messeger =>{
  if(message.content === ("-info")){
    const alert = new MessageEmbed(message.content)
    .setTitle(nombreTilla[0])//titulo del msg
    .setAuthor(message.member.displayName, message.author.displayAvatarUrl())
    .setColor(0xE964ED)//color laterales
    //.setThumbnail()//es para poner un gif 
    .setDescription(precioTilla[0])//desdripcion de este contenido
    //podemos agregar mas contenido pero ahi vamos viendo 
    message.channel.send(alert);
  }
})
console.log(nombreTilla[0]);
console.log(precioTilla[0]);
client.login('MTA2NjQ0MzI5NzQ5MDQ3NzEzNg.Gl8F1Q.GBt6pv3RFZRSdgI6Fp4txYTIvVFm2XZ070TPMI');