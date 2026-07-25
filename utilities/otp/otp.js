const otpStore = new Map();
const axios = require('axios')
const Otp = require('../../models/Otp');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOtp = async (email) => {

  const code = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  await Otp.findOneAndUpdate(
    { email },
    {
      code,
      createdAt: new Date()
    },
    {
      upsert: true,
      new: true
    }
  );

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: 'Verification Code',

    html: `
            <h2>Your verification code</h2>
            <h1>${code}</h1>
            <p>This code expires in 5 minutes.</p>
        `
  });

};

exports.verifyOtp = async (email, code) => {

  const record = await Otp.findOne({
    email
  });

  if (!record)
    return false;

  if (record.code !== code)
    return false;

  await Otp.deleteOne({
    email
  });

  return true;
};