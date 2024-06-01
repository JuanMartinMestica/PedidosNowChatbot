const { addKeyword } = require('@bot-whatsapp/bot');
const { insertOrder } = require('../database/database');

const hamburguesaFlow = addKeyword(['1', 'Hamburguesa', 'hamburguesa'])
    .addAnswer(['¡Perfecto, tu pedido de Hamburguesa Rex XL fue enviado! 🍔',
        'Te avisaremos el estado de tu pedido en breve⌚'
    ])  
    .addAction(async (ctx) => {
        await insertOrder(ctx.from, 'Hamburguesa Rex XL', new Date(), 'Nuevo');
    });

const pizzaFlow = addKeyword(['2', 'Pizza', 'pizza'])
    .addAnswer(['¡Perfecto, tu pedido de Pizza Napolitana fue enviado! 🍕',
    'Te avisaremos el estado de tu pedido en breve⌚'
    ])
    .addAction(async (ctx) => {
        await insertOrder(ctx.from, 'Pizza Napolitana', new Date(), 'Nuevo');
    });

const ensaladaFlow = addKeyword(['3', 'Ensalada', 'ensalada'])
    .addAnswer(['¡Perfecto,  tu pedido de Ensalada Caesar fue enviado! 🥗',
    'Te avisaremos el estado de tu pedido en breve⌚'
    ])
    .addAction(async (ctx) => {
        await insertOrder(ctx.from, 'Ensalada Caesar', new Date(), 'Nuevo');
    });


module.exports = {hamburguesaFlow, pizzaFlow, ensaladaFlow}