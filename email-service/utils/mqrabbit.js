const amqp = require('amqplib');


let connection;
let channel;
let queue;

const connect = async () => {
  try {

    connection = await amqp.connect('amqp://guest:guest@amqp-node:5672/%2f');
    channel = await connection.createChannel();



  } catch (error) {
    console.error(error);
    process.exit(1);
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

module.exports = { sendTo };