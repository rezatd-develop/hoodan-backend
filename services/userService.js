const User = require('../models/User');

exports.findUserByEmail = async (email) => {
  return await User.findOne({
    email: email.toLowerCase().trim(),
  });
};

exports.findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

exports.createUser = async ({
  email,
  phone,
  firstName,
  lastName,
  address,
  postalCode,
}) => {
  const user = new User({
    email: email.toLowerCase().trim(),
    phone,
    firstName,
    lastName,
    address,
    postalCode,
  });

  return await user.save();
};