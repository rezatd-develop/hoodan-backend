const otpStore = new Map();
const { farazSendPattern } = require('@aspianet/faraz-sms');
const axios = require('axios')

exports.sendOtp = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  axios.post(
    'https://api2.ippanel.com/api/v1/sms/pattern/normal/send',
    {
      "code": "jft6hxvbzy722jp",
      "sender": "+983000505",
      "recipient": "+989390753192",
      "variable": {
        "verification-code": code
      }
    },
    { headers: { Authorization: 'OWVjMjZiMmQtOWM5Yy00NjU0LWFiODItZjE5YjZjZTFhYTFlNTc1OGQwMmVhZWJlYjIyMGJkMTU5NDM2NDlkNDVkZmY=' } }
  );


  otpStore.set(phone, code);
};

exports.verifyOtp = async (phone, code) => {
  const storedCode = otpStore.get(phone);
  if (storedCode === code) {
    otpStore.delete(phone);
    return true;
  }
  return false;
};
