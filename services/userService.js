const User = require('../models/User');

exports.findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

exports.createUser = async ({ phone, firstName, lastName }) => {
  const user = new User({ phone, firstName, lastName });
  return await user.save();
};
