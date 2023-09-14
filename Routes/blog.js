const express = require('express');
const router = express.Router();


router.post('/blog/create', (req, res) => {
    res.send(req.body)
})

// Define a GET route for /users
router.get('/blog', (req, res) => {
    res.send('this is the main home for blog');
});

// Define a POST route for /users
router.get('/blog/:id', (req, res) => {
    res.send(`this a blog with id ${req.query.id}`);
});

module.exports = router;
