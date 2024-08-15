const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config();
const EMAIL = "fsmarketplace0@gmail.com";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: process.env.GMAIL_PASSKEY,
    },
});

async function sendVerificationEmail(receiverEmail, secret) {
    const mailOptions = {
        from: EMAIL,
        to: receiverEmail,
        subject: "Verify your account",
        text: `Verification Key: ${secret}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return "SUCCESS";
    } catch (error) {
        console.error("Error sending email: ", error);
        return "ERROR";
    }
}

module.exports = sendVerificationEmail;
