const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const utils = require('../Utils')

router.get('/dashboard', authenticate, (req, res) => {
    const jsonData = JSON.stringify({ data: req.user },)
    const data = {
        userId: req.user.id,
        userEmail: req.user.email,
        userImage: req.user.image
    }
    res.render('dashboard',{data});
})

module.exports = router