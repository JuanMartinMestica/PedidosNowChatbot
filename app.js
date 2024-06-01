const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const { adapterDB } = require('./database/database');
const { mainFlow } = require('./flows/mainFlow');
const { monitorOrderStatus } = require('./database/changeStreams');


const main = async () => {
    try {
        const adapterFlow = createFlow([mainFlow]);
        const adapterProvider = createProvider(BaileysProvider);

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        QRPortalWeb();
        monitorOrderStatus(adapterProvider);

    } catch (error) {
        console.error('Error al inicializar el bot:', error);
        process.exit(1); 
    }
};

main();
