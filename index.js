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
        snkrs.push(i +1 + '.- ' + nombreTilla[i]);
        nombreTilla.join('x');
        
    }
};

async function encenderBot () {
    //await init();     //aca podemos parar el proceso y ver si funciona de manera mas rapida
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
                                                                                                                          
    client.on('messageCreate', async (message) =>{
        if(message.author.bot) return

        var prefix = config.prefix

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commando = args.shift().toLowerCase();

        if (commando === 'info') {
            const embed = new EmbedBuilder()
            .setTitle('NIKE.CL')
            .setDescription(snkrs.join('\n'))
            .setImage('https://play-lh.googleusercontent.com/kWXy8EJ9rL4iH2lDxiDv0LYd6DeTPHLbzGXDHwZLvRy5UBhYHezTDm51onReoWZdzjPX')
            await message.channel.send({ embeds: [embed] });

            /*if(commando === snkrSTR.substr(1, snkrSTR.length)){
                const comandoNumTilla = parseInt(commando)-1
                const embedTilla = new EmbedBuilder()
                .setTitle('SNKRS')
                .setDescription(nombreTilla[comandoNumTilla] + '\n' + precioTilla[comandoNumTilla] + '\n' + fechaTilla[comandoNumTilla])
                .setThumbnail(fotoTilla[comandoNumTilla])
                
                message.channel.send({ embeds: [embedTilla]})
            }*/
            showUserDashboard();
        }

        else{
            const comandoNumTilla = parseInt(commando)-1
            const embedTilla = new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[comandoNumTilla] + '\n' + precioTilla[comandoNumTilla] + '\n' + fechaTilla[comandoNumTilla])
            .setThumbnail(fotoTilla[comandoNumTilla])

            message.channel.send({ embeds: [embedTilla]})
        }

        /*if(commandoNuevo === snkrs[0]){
            const comandoNumTilla = parseInt(commandoNuevo)-1
            const embedTilla = new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[comandoNumTilla] + '\n' + precioTilla[comandoNumTilla] + '\n' + fechaTilla[comandoNumTilla])
            .setThumbnail(fotoTilla[comandoNumTilla])
            
            message.channel.send({ embeds: [embedTilla]})
        }*/

        /*if (message.content === commando){
            const comandoNumTilla = parseInt(commando)-1
            const embedTilla = new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[comandoNumTilla] + '\n' + precioTilla[comandoNumTilla] + '\n' + fechaTilla[comandoNumTilla])
            .setThumbnail(fotoTilla[comandoNumTilla])
            
            message.channel.send({ embeds: [embedTilla] })
        }*/
        


        /*if ( message.content === '2'){
            const embed = await new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[1] + '\n' + precioTilla[1] + '\n' + fechaTilla[1])
            .setThumbnail(fotoTilla[1])
        
            message.channel.send({ embeds: [embed] })
        }
        if ( message.content === '3'){
            const embed = await new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[2] + '\n' + precioTilla[2] + '\n' + fechaTilla[2])
            .setThumbnail(fotoTilla[2])
        
            message.channel.send({ embeds: [embed] })
        }
        if ( message.content === '4'){
            const embed = await new EmbedBuilder()
            .setTitle('SNKRS')
            .setDescription(nombreTilla[3] + '\n' + precioTilla[3] + '\n' + fechaTilla[3])
            .setThumbnail(fotoTilla[3])
        
            message.channel.send({ embeds: [embed] })
        }*/
        
    });
})

