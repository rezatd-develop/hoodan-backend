const otpStore = new Map();

exports.sendOtp = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, code);
  console.log(`OTP for ${phone}: ${code}`);
};

exports.verifyOtp = async (phone, code) => {
  const storedCode = otpStore.get(phone);
  if (storedCode === code) {
    otpStore.delete(phone);
    return true;
  }
  return false;
};
