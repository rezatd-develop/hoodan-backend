require('dotenv').config();

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);


async function test() {

    const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'reza.td.develop@gmail.com',
        subject: 'Test OTP',
        html: '<h1>123456</h1>'
    });

    console.log(result);
}


test();