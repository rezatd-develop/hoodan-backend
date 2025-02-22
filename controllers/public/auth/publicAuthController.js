const { sendOtp, verifyOtp } = require('../../../utilities/otp/otp');
const { generateToken } = require('../../../utilities/jwt/jwt');
const { findUserByPhone, createUser } = require('../../../services/userService');

exports.getPhone = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Phone number is required'
    });
  }
  try {
    await sendOtp(phone);
    return res.json({
      hasError: false,
      data: { phone },
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error sending OTP'
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Phone and OTP code are required'
    });
  }
  try {
    const isValid = await verifyOtp(phone, code);
    if (!isValid) {
      return res.status(400).json({
        hasError: true,
        data: null,
        message: 'Invalid OTP'
      });
    }

    const user = await findUserByPhone(phone);
    if (user) {

      const token = generateToken(user);
      return res.json({
        hasError: false,
        data: { token },
        message: 'Authentication successful'
      });
    } else {

      return res.json({
        hasError: false,
        data: null,
        message: 'User not found, please complete registration',
        continueToSignUp: true
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error verifying OTP'
    });
  }
};

exports.registerUser = async (req, res) => {
  const { phone, firstName, lastName } = req.body;
  if (!phone || !firstName || !lastName) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Phone, first name, and last name are required'
    });
  }
  try {

    const existingUser = await findUserByPhone(phone);
    if (existingUser) {
      return res.status(400).json({
        hasError: true,
        data: null,
        message: 'User already exists'
      });
    }

    const user = await createUser({ phone, firstName, lastName });
    const token = generateToken(user);
    return res.json({
      hasError: false,
      data: null,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error registering user'
    });
  }
};
