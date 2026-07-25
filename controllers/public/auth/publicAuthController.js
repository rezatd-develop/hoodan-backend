const { sendOtp, verifyOtp } = require('../../../utilities/otp/otp');
const { generateToken } = require('../../../utilities/jwt/jwt');
const {
  findUserByEmail,
  createUser
} = require('../../../services/userService');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Email is required'
    });
  }

  try {
    await sendOtp(email);

    return res.json({
      hasError: false,
      data: { email },
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
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Email and OTP code are required'
    });
  }

  try {

    const isValid = await verifyOtp(email, code);

    if (!isValid) {
      return res.status(400).json({
        hasError: true,
        data: null,
        message: 'Invalid OTP'
      });
    }

    const user = await findUserByEmail(email);

    if (user) {
      const token = generateToken(user);

      return res.json({
        hasError: false,
        data: { token },
        message: 'Authentication successful'
      });
    }

    return res.json({
      hasError: false,
      data: { email },
      continueToSignUp: true,
      message: 'User not found, please complete registration'
    });

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

  const {
    email,
    phone,
    firstName,
    lastName
  } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Email, first name and last name are required'
    });
  }

  try {

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        hasError: true,
        data: null,
        message: 'User already exists'
      });
    }

    const user = await createUser({
      email,
      phone,
      firstName,
      lastName
    });

    const token = generateToken(user);

    return res.json({
      hasError: false,
      data: {
        token
      },
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
