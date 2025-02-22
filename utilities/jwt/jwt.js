const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return jwt.sign(payload, SECRET, { expiresIn: '48h' });
};
