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
        snkrs.push(i +1 + '- ' + nombreTilla[i] + '\n');
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
    console.log(snkrs)
                                                                                                                          
    client.on('messageCreate', async (message) =>{
        if(message.author.bot) return

        if (message.content === 'info') {
            const embed = new EmbedBuilder()
            .setTitle('que par deseas ver')
            .setDescription(snkrs.toString())//no se como sacar las , para que se vean mas bonitas
            //hacer un for para contar la cantidad de elemento y asi seguir con lo if y no colocarlos a mano tipo for (a)
            .setImage(fotoTilla[0])
            message.channel.send({ embeds: [embed] })
        }
            if ( message.content === '1'){
                const embed = await new EmbedBuilder()
                .setTitle('SNKRS')
                .setDescription(nombreTilla[0] + '\n' + precioTilla[0] + '\n' + fechaTilla[0])
                .setThumbnail(fotoTilla[0])
            
                message.channel.send({ embeds: [embed] })
            }
            if ( message.content === '2'){
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
            }
        // podemos mejorar estos creando una funcion donde no haya que poner los numeros uno por uno si no que ya sepa cuanto elementos hay 
        //de momento solo se me ocurre asi 
        
    });
})
