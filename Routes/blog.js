const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const jsonServer = require('../Api/jsonServer');
const path = require('path')

const multer = require('multer');

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/uploads/blog'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

//* Create a new blog
router.post('/blog/create', authenticate, upload.single('image'), async (req, res) => {
    try {
        const data = {
            blogTitle: req.body.title,
            blogContent: req.body.content,
            userId: req.user.id,
            userEmail: req.user.email,
            userFullName: req.user.fullName,
            blogImage: req.file ? req.file.filename : "",
            createdAt: req.body.createdAt
        };

        const response = await jsonServer.postBlog(data);
        data.id = response.id
        res.send(data);
    } catch (error) {
        res.status(500).send('Error creating blog');
    }
});

// Delete a blog by ID
router.delete('/blog/:id', authenticate, async (req, res) => {
    try {
        const blogId = parseInt(req.params.id, 10); // Parse the blog ID from the URL parameter
        const userId = req.user.id; // Get the user's ID from authentication (assuming it's stored there)

        //* Check if the user has permission to delete the blog post (e.g., the user is the owner)
        const blogToDelete = await jsonServer.getBlogById(blogId);
        if (!blogToDelete) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (blogToDelete.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized: You do not have permission to delete this blog' });
        }

        //* Delete the blog post
        await jsonServer.deleteBlogById(blogId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' + error });
    }
});

//* List a user blogs
router.get('/blogs/:userId', authenticate, async (req, res) => {
    const data = await jsonServer.getBlogsByUser(req.params.userId)
    if (data.length > 0)
        res.send(data)
    else
        res.redirect('/404')
});

//* Get blog by blog Id

router.get('/blog/:blogId', authenticate, async (req, res) => {
    const data = await jsonServer.getBlogById(req.params.blogId)
    res.render('blog', data)
});



module.exports = router;
