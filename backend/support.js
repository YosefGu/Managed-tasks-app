
const nodemailer = require('nodemailer');
const password = process.env.MAIL_PASSWORD;

const Support = (email, title, page) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'spprtmyapp@gmail.com',
            pass: password
        }
    });

    const mailOption = {
        from: 'spprtmyapp@gmail.com',
        to: email,
        subject: title,
        html: page,
        // attachments: [
        //     {
        //         filename: '',
        //         path: '<https://www.google....>'
        //     }
        // ]
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    })
}

module.exports = Support;