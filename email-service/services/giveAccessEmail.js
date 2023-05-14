const ejs = require('ejs');
const nodemailer = require("nodemailer");

const giveAccessEmail = async (data) => {

    let providedData = {
        success: false,
        message: "erreur d'authentification"
    }
    console.log(data);
    const { recipient, subject, template, variables } = data;
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
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
    return {
        providedData
    }
};

module.exports = {
    giveAccessEmail
};