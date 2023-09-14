const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your-secret-key'

exports.createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}