const { Resend } = require('resend');
const Otp = require('../../models/Otp');

const resend = new Resend(process.env.RESEND_API_KEY);


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


  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verification Code',
    html: `
      <h1>${code}</h1>
      <p>This code expires in 5 minutes.</p>
    `
  });

};


exports.verifyOtp = async (email, code) => {

  const otp = await Otp.findOne({
    email
  });


  if (!otp)
    return false;


  if (otp.code !== code)
    return false;


  await Otp.deleteOne({
    email
  });


  return true;
};