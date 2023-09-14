const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const JWT_SECRET = 'your-secret-key'
const JSON_SERVER_API_URL = 'http://localhost:3000'
const utils = require('../Utils')
const logged = require('../Middlewares/logged');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/uploads/'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

const validationOptions = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Passwords do not match')
            }
            return true
        }),
]

router.post('/register', upload.single('image'), validationOptions, async (req, res) => {
    const { email, password, confirmPassword } = req.body
    const image = req.file
    const errors = validationResult(req)

    //* Check if validation passes
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //* Check if mail already exists
    const { data: users } = await axios.get(`${JSON_SERVER_API_URL}/users`)
    const user = users.find(u => u.email === email)
    if (user)
        return res.status(401).json({ error: 'Email already exist' })

    //* Try create new user 
    try {
        const salt = utils.hash.makeSalt(10)
        const userData = {
            email,
            salt,
            password: utils.hash.makeHash(password, salt),
            createdAt: new Date().toString(),
            image: image ? image.filename : ""
        }

        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })

        //* save new user to JSON SERVER
        const response = await axios.post('http://localhost:3000/users', userData)

        res.cookie('jwt', token, { httpOnly: true })
        res.json({ token, message: "Signed Successfully" })

    } catch (error) {
        console.error('Error saving user data:', error)
        res.status(500).json({ error: 'Internal Server Error' + error })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        // Fetch user data from JSON server
        const { data: users } = await axios.get(`${JSON_SERVER_API_URL}/users`)

        // Find the user with the provided email
        const user = users.find(u => u.email === email)
        if (!user)
            return res.status(401).json({ error: 'This user does not exist.' })

        const salt = user.salt
        const hashedPassword = utils.hash.makeHash(password, salt)

        if (!user || user.password !== hashedPassword) {
            return res.status(401).json({ error: 'Authentication failed' })
        }

        // User authentication successful, generate JWT token
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            // Add any other user data you want to include in the token
        }

        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })

        // Return the token in the response
        res.cookie('jwt', token, { httpOnly: true })
        res.json({ token })
    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ error: 'Internal Server Error' + error })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
});

router.get('/login', logged, (req, res) => {
    res.render('login.ejs')
})

router.get('/register', logged, (req, res) => {
    res.render('register.ejs')
})

module.exports = router