const nodemailer = require("nodemailer");

const sendEmail = async (name, email, messageType) => {
    let text;
    let html;

    if (messageType === 'create') {
        text = `Welcome to the app, ${name}.`;
        html = `<b>Welcome to the app, ${name}.</b>`;
    }

    if (messageType === 'delete') {
        text = `${name}, Sorry to see you go.`;
        html = `<b>${name}, Sorry to see you go.</b>`;
    }
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SENDBLUE_LOGIN, // generated ethereal user
        pass: process.env.SENDBLUE_PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SENDBLUE_LOGIN, // sender address
      to: email, // list of receivers
      subject: "Thanks for joining in!", // Subject line
      text: text, // plain text body
      html: html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
  
sendEmail().catch(console.error);

module.exports = sendEmail;