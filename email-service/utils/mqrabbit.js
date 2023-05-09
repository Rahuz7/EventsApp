const amqp = require('amqplib');

// Variables globales pour stocker la connexion et le canal
let connection;
let channel;
let queue;
// Fonction pour établir la connexion AMQP et créer un canal
const connect = async () => {
  try {

    connection = await amqp.connect('amqp://guest:guest@amqp-node:5672/%2f');
    channel = await connection.createChannel();

    // Déclaration de la file d'attente

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}


const sendTo = async (pipeline, msg) => {
    try {
      // Vérification si la connexion et le canal sont déjà créés
      if (!connection || !channel) {
        await connect(); // Établissement de la connexion AMQP et création du canal
      }
  
      
      channel.sendToQueue(pipeline, Buffer.from(msg));
      
  
      console.log("Les messages ont été envoyés à la file d'attente");
    } catch (error) {
      console.error(error);
    }
  }

module.exports = { sendTo };