const amqp = require('amqplib');


let connection;
let channel;
let queue;

const connect = async () => {
  try {

    connection = await amqp.connect('amqp://guest:guest@amqp-node:5672/%2f');
    channel = await connection.createChannel();

   
    queue = 'user-api';
    await channel.assertQueue(queue, { durable: false });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}


const envoyerMessage = async (msg) => {
  try {
   
    if (!connection || !channel) {
      await connect(); 
    }
    const hashKey = Math.floor(Math.random() * 10) + 1;

 
    channel.sendToQueue(queue, Buffer.from(msg),
    {
      contentType: 'text/plain',
      persistent: true,
      headers: { 'x-consistent-hash-key': hashKey }
    });
    

    console.log("Les messages ont été envoyés à la file d'attente");
  } catch (error) {
    console.error(error);
  }
}

const sendTo = async (pipeline, msg) => {
  try {
    
    if (!connection || !channel) {
      await connect(); 
    }

    
    channel.sendToQueue(pipeline, Buffer.from(msg));
    

    console.log("Les messages ont été envoyés à la file d'attente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { envoyerMessage, sendTo };
