const otpStore = new Map();
const axios = require('axios')
const Otp = require('../../models/Otp');

exports.sendOtp = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.findOneAndUpdate(
    { phone },
    { code, createdAt: new Date() },
    { upsert: true, new: true }
  );

  try {
    const res = await axios.post(
      'https://api2.ippanel.com/api/v1/sms/pattern/normal/send',
      {
        code: 'jft6hxvbzy722jp',
        sender: '+983000505',
        recipient: `+${phone}`,
        variable: { 'verification-code': code }
      },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'apikey': 'OWVjMjZiMmQtOWM5Yy00NjU0LWFiODItZjE5YjZjZTFhYTFlNTc1OGQwMmVhZWJlYjIyMGJkMTU5NDM2NDlkNDVkZmY='
        }
      }
    );
    console.log('SMS sent:', res.data);
  } catch (err) {
    console.error('Error sending SMS:', err.response?.data || err.message);
    throw err;
  }
};


exports.verifyOtp = async (phone, code) => {
  const record = await Otp.findOne({ phone });

  if (!record) {
    return false;
  }
  if (record.code === code) {
    await Otp.deleteOne({ phone });
    return true;
  }
  return false;
};

