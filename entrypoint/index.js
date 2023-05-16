const express = require('express');
const app = express();
//const https = require('https');
const fs = require('fs');
const session = require('express-session');
const sharedSession = require('express-socket.io-session');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { Server } = require("socket.io");
const rabbitmq = require('./mqrabbit');
const amqp = require('amqplib');
const router = require("./router/router");
const serviceMap = require("./mapper/mapper");


console.log('serviceMap:', serviceMap);

const sessionMiddleware = session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
});

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.crt');

const options = {
  key: privateKey,
  cert: certificate
};

app.use(cors({
  origin: '*'
}));
app.use(cookieParser());
app.use(sessionMiddleware);

//const server = https.createServer(options, app);
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
    },
  });
  

io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));

const connectedSockets = [];

async function ecouterMessage() {
  const connection = await amqp.connect('amqp://guest:guest@amqp-node:5672/%2f');
  const channel = await connection.createChannel();

  await channel.assertQueue('entrypoint', { durable: false });
  console.log('Listen on channel entrypoint.')


  channel.consume('entrypoint', (message) => {
    console.log('consume user data from api user micro service', JSON.stringify(JSON.parse(message.content.toString()), null, 2 ) )
    let data = JSON.parse(message.content.toString());
    if (serviceMap.hasOwnProperty(data.action)) {
      console.log(`Action '${data.action}' call`);
     data.pipeline = undefined;
     const { providedData, pipeline, action ,nextPipeline, nextAction } = serviceMap[data.action](data, connectedSockets); 
     
     console.log("Retour action ", data.action);
     data.action = undefined;
     console.log("providedData", providedData);
     console.log("pipeline", pipeline)
     console.log("action", action)
     console.log("nextPipeline", nextPipeline)
     console.log("nextAction", nextAction)

     if (providedData !== undefined) {  data.providedData = { ...providedData } }

     if (data.nextPipeline !== undefined && data.nextAction !== undefined) {
        data.pipeline = data.nextPipeline;
        data.action = data.nextAction;
        data.nextPipeline = undefined;
        data.nextAction = undefined;
     }
     
     if (pipeline !== undefined) { data.pipeline = pipeline }
     if (action !== undefined) { data.action = action }
     if (nextPipeline !== undefined) { data.nextPipeline = nextPipeline }
     if (nextAction !== undefined) { data.nextAction = nextAction }
     
     console.log("---- Final state ----");
     console.log("data.providedData", data.providedData);
     console.log("data.pipeline", data.pipeline)
     console.log("data.action", data.action)
     console.log("data.nextPipeline", data.nextPipeline)
     console.log("data.nextAction", data.nextAction)


     if (data.pipeline !== undefined) {
        console.log('next pipeline: ', data.pipeline)
        mqrabbit.sendTo(data.pipeline, JSON.stringify(data))
     } else {
        console.log('pipeline end')
     }
  } else {
    console.error(`Action '${data.action}' inconnue`);
  }

  }, { noAck: true });
}

ecouterMessage().catch(console.error);


app.get('/', (req, res) => {
  res.json({ message: 'Entrypoint service Running a !' });
});

io.on("connection", (socket) => {
    connectedSockets[socket.id] = socket;
    console.log(`User Connected: ${socket.id}`);
  
  
    socket.on("send_message", (data) => {
      console.log(socket.id)
      io.emit("receive_message", data);
    });

    router.linkRoutes(socket);
  
  });
  
server.listen(6000, () => {
  console.log('Serveur en écoute sur le port 6000');
});
