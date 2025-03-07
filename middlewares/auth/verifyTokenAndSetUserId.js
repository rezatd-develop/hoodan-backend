const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

const verifyTokenAndSetUserId = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(authHeader, SECRET);

        // Ensure required fields are present in the token
        if (!decoded.id || !decoded.firstName || !decoded.lastName || !decoded.phone) {
            return res.status(400).json({ error: 'Invalid token data. User details missing.' });
        }

        req.user = {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            phone: decoded.phone,
            role: decoded.role
        };

        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = { verifyTokenAndSetUserId };
