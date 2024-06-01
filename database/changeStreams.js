const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URI = process.env.MONGO_DB_URI 
const MONGO_DB_NAME = process.env.MONGO_DB_NAME 

const client = new MongoClient(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function monitorOrderStatus(provider) {
    try {

        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const ordersCollection = db.collection('orders');

        //Se inicializa el changeStream sobre la colección "orders"
        const changeStream = ordersCollection.watch();

        changeStream.on('change', async (change) => {

            //Verifica cambios de tipo "Update" y  que sean sobre el Status
            if (change.operationType === 'update' && change.updateDescription.updatedFields.status) {
                
                //Obtengo los datos del pedido modificado
                const { phoneNumber, item, status } = await ordersCollection.findOne({ _id: change.documentKey._id });

                const message = `Hola! El estado de tu pedido de ${item} ha cambiado a: ${status}`;

                await provider.sendText(`${phoneNumber}@s.whatsapp.net`, message)

                if(status === 'Listo'){

                    await provider.sendText(`${phoneNumber}@s.whatsapp.net`, '¡Ya podés buscar tu pedido! 🍕🍔🥗')
                    await provider.sendLocation(`${phoneNumber}@s.whatsapp.net`, "24.121231",  "55.1121221")

                }

            }
        });

    } catch (error) {
        console.error('Error monitoreando cambios en la colección de pedidos:', error);
    }
}

module.exports = { monitorOrderStatus };
