const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`el servidor ${client.user.tag} esta listo!!!`);
  client.application.commands.set([
    {
        name: 'info',
        description: 'informacion zapatillas',
        options: [],
    },
    
    {
        name: 'hola',
        description: 'chao', 
        options: [],
    },
  ]);
});

client.on('interactionCreate', (inn) => {
  if (inn.isCommand() && inn.commandName === 'info') {
    inn.reply('pong')
  } 

  if (inn.isCommand() && inn.commandName === 'hola') {
    inn.reply('chao')
  } 
});

client.login();