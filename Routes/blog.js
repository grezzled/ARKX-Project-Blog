const express = require('express');
const router = express.Router();

// Define a GET route for /users
router.get('/', (req, res) => {
    res.send('this is the main home for blog');
});

// Define a POST route for /users
router.get('/blog/:id', (req, res) => {
    res.send(`this a blog with id ${req.query.id}`);
});

module.exports = router;
