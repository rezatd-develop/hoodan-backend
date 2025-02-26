const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

const verifyTokenAndSetUserId = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(authHeader, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = { verifyTokenAndSetUserId };
