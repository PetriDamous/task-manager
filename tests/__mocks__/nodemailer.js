const { createTransport} = require("nodemailer");
const sendEmail = require('../../src/emails/account');

module.exports = {
    createTransport,
    sendEmail
};