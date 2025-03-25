const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail address
        pass: 'your-app-password' // Replace with your App Password
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'receiver-email@gmail.com',
    subject: 'Test Email from Node.js',
    text: 'This is a test email sent using Node.js!',
    html: '<b>This is a test email sent using Node.js!</b>'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error('Error occurred:', err.message);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
