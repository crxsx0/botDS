const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const XLSX = require('xlsx');

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
});

//mensaje embed
client.on("message", messeger =>{
  if(message.content === ("info")){
    const alert = new MessageEmbed(message.content)
    .setTitle()//titulo del msg
    .setAuthor(message.member.displayName, message.author.displayAvatarUrl())
    .setColor(0xE964ED)//color laterales
    .setThumbnail()//es para poner un gif 
    .setDescription("")//desdripcion de este contenido
    //podemos agregar mas contenido pero ahi vamos viendo 
    message.channel.send(alert);
  }
})

//funcion para leer archivo excel
function leerExcel(ruta){
  const workbook = XLSX.readFile(ruta);
  const workbookSheets = workbook.SheetNames;
  //console.log(workbookSheets);
  const sheet = workbookSheets[0];
  const dataEXcel = XLSX.utils.sheet_to_json(workbook.sheets[sheet]);
  //console.log(dataEXcel)
  for (const itemFila of dataEXcel ){
    console.log(itemFila[])
  }
}

leerExcel('nike.xlsx')
client.login();