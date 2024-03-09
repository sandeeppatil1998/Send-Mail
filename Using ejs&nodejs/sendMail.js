const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send email
async function sendMail(data, attachment) {
    try {
        // Create a Nodemailer transporter using SMTP
        let transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail', 'hotmail', etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password or app password
            },
            debug: true
        }); 
        
        // Send email
        let info = await transporter.sendMail({

            from: process.env.EMAIL_USER, // Sender address
            to: data.to, // List of recipients
            subject: data.subject, // Subject line
            text: data.emailContent,
            attachments :[
                {
                    filename : attachment.originalname,
                    content: attachment.buffer,
                    encoding: 'base64'
                }
            ]
        });
        console.log(info);

        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendMail;
