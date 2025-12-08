import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/template";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendWelcomeEmail = async ({email,name,intro}: WelcomeEmailData) =>{
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}',name).replace('{{intro}}',intro);


    const mailOptions = {
        from:`Signalist <aashrithbasketballoct9@gmail.com>`,
        to:email,
        subject:"Welcome to Signalist! . Your stock market toolkit is ready!",
        text:"Thanks for signing up!",
        html:htmlTemplate
    }

    await transporter.sendMail(mailOptions);
}