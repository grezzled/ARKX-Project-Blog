const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const jsonServer = require('../Api/jsonServer');

//* Create a new blog
router.post('/blog/create', authenticate, async (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
        userEmail: req.user.email
    }
    await jsonServer.postBlog(data)
    res.send(data)
})

//* List a user blogs
router.get('/blogs/:userId', authenticate, async (req, res) => {
    const data = await jsonServer.getBlogsByUser(req.params.userId)
    console.log(data)
    res.send(data)
    // res.send(req.params.userId)
});



module.exports = router;
