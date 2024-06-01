    const { addKeyword } = require('@bot-whatsapp/bot');
    const {hamburguesaFlow, pizzaFlow, ensaladaFlow } = require('./foodFlow')

    const menuFlow = addKeyword(['Menu', 'Menú', 'menu', 'menú']).addAnswer(
        [
            " 📄 El *menú* de hoy es:",
            '1. Hamburguesa Rex XL 🍔',
            '\n2. Pizza Napolitana 🍕 ',
            '\n3. Ensalada César 🥗',
            '\n ¿Qué le gustaría comer hoy?'

        ],
        null,
        null,
        [hamburguesaFlow, pizzaFlow, ensaladaFlow]  
    );

    module.exports = { menuFlow };
