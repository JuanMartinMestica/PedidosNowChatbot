const { addKeyword } = require('@bot-whatsapp/bot');
const { menuFlow } = require('./menuFlow'); 

const mainFlow = addKeyword(['testbot', 'Testbot'])
    .addAnswer('🙌 Hola! Bienvenido a *PedidosNow*')
    .addAnswer(
        [
            "Si querés recibir el menú del día, por favor envíe:",
            "👉 *Menú*",
        ],
        null,
        null,
        [menuFlow]
    );

module.exports = { mainFlow };
