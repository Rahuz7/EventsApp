const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const amqp = require('amqplib');
const fs = require('fs');
const path = require('path');
const mqrabbit = require('./utils/mqrabbit')
const serviceDir = './services';
const ejs = require('ejs');
const bodyParser = require('body-parser');
const serviceMap = {};

app.use(bodyParser.json());

const loadService = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      loadService(fullPath);
    } else if (file.endsWith('.js')) {
      console.log('full Path =', fullPath)
      const actions = require("./"+fullPath);
      Object.assign(serviceMap, actions);
    }
  });
};

loadService(serviceDir);
  async function ecouterMessage() {
    const connection = await amqp.connect('amqp://guest:guest@amqp-node:5672/%2f');
    const channel = await connection.createChannel();

    await channel.assertQueue('email-api', { durable: false });
    console.log('Listen on Email Api Channel')

    const numWorkers = 10;

    await channel.prefetch(numWorkers);
    channel.consume('email-api', async (message) => {


     
      let data = JSON.parse(message.content.toString());
      console.log('CONSUME DATA: ', data)
      if (serviceMap.hasOwnProperty(data.action)) {
          console.log(`Action '${data.action}' call`);
         data.pipeline = undefined;
         const { providedData, pipeline, action ,nextPipeline, nextAction } = await serviceMap[data.action](data.providedData); // Appelle la fonction appropriée en fonction de l'action
         data.action = undefined;
         console.log("Retour action ", data.action);
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
  res.json({ message: 'Email service Running !' });
});

app.listen(6000, () => {
  console.log('Serveur en écoute sur le port 6000');
});


app.get('/sendmailtest', (req, res) => {
    // const { recipient, subject, template, variables } = req.body;

    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: 'eventsapp-mailhog-1',
        port: 1025, // or 8025
        secure: false,
    });

    let mailOptions = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        text: 'Hello from Node.js!',
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});



app.post('/sendmail', async (req, res) => {
    console.log(req.body);
    const { recipient, subject, template, variables } = req.body;
    console.log(`Recipient: ${recipient}, Subject: ${subject}`);
    let transporter = nodemailer.createTransport({
        host: 'mailhog',
        port: 1025, // or 8025
        secure: false,
    });

    try {
        const renderedTemplate = await ejs.renderFile(`./templates/${template}.ejs`, variables);

        let mailOptions = {
            from: 'sender@example.com',
            to: recipient,
            subject: subject,
            html: renderedTemplate,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error rendering email template');
    }
});


