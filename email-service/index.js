const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const ejs = require('ejs');

app.get('/', (req, res) => {
  res.json({ message: 'Email service Runnssing !' });
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
  const { recipient, subject, template, variables } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'eventsapp-mailhog-1',
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


