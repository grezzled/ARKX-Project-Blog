const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your-secret-key'

exports.createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Token verification failed' + error);
    }
}