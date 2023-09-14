const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const utils = require('../Utils')

router.get('/dashboard', authenticate, (req, res) => {
    const token = req.cookies.jwt;
    const userData = utils.verifyToken(token)
    res.render('dashboard', { data: userData })
})

module.exports = router