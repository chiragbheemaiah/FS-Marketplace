const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config();

const EMAIL = "fsmarketplace0@gmail.com";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: process.env.GMAIL_PASSKEY,
    },
});

async function sendEmail(receiverEmail, data, messageType) {
    let mailOptions = {
        from: EMAIL,
        to: receiverEmail,
    };

    if(messageType === 'VERIFY'){
        mailOptions.subject = "Verify your account";
        mailOptions.text = `Verification Key: ${data}`;
    } else if(messageType === 'PASSWORD_RESET'){
        mailOptions.subject = "Instructions to reset your password";
        mailOptions.text = `Your temporary password is ${data}. Please log in and change your password asap.`;
    } else {
        throw new Error("Invalid messageType provided.");
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return "SUCCESS";
    } catch (error) {
        console.error("Error sending email: ", error);
        return "ERROR";
    }
}

module.exports = sendEmail;
