const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const utils = require('../Utils')

router.get('/dashboard', authenticate, (req, res) => {
    res.render('dashboard', { data: req.user })
})

module.exports = router