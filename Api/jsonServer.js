const axios = require('axios')

const JSON_SERVER_API_URL = 'http://localhost:3000'

//// USERS

//* Create a new user
exports.postUser = async (data) => {
    const response = await axios.post(`${JSON_SERVER_API_URL}/users`, data)
    return response.data
}

//* Returns all users
exports.getUsers = async () => {
    const { data: users } = await axios.get(`${JSON_SERVER_API_URL}/users`)
    return users
}

//* Returns if a user exists or not
exports.isUser = async (email) => {
    const { data: users } = await axios.get(`${JSON_SERVER_API_URL}/users`)
    const user = users.find(u => u.email === email)
    return user
}

//// BLOGS

//* Create a new blog
exports.postBlog = async (data) => {
    const response = await axios.post(`${JSON_SERVER_API_URL}/blogs`, data)
    return response.data
}

//* Get a specific blog by its ID
exports.getBlogById = async (blogId) => {
    const { data: blog } = await axios.get(`${JSON_SERVER_API_URL}/blogs/${blogId}`)
    return blog
};


//* Get blogs of a specific user
exports.getBlogsByUser = async (userId) => {
    const { data: blogs } = await axios.get(`${JSON_SERVER_API_URL}/blogs`)
    const userBlogs = blogs.filter(u => u.userId == userId)

    // Function to shorten blogContent to 4 lines
    function shortenBlogContent(blogContent) {
        const lines = blogContent.split('\r\n');
        const shortenedContent = lines.slice(0, 4).join('\r\n');
        return shortenedContent;
    }

    // Map over the user blogs and shorten the blogContent
    const userBlogsShortened = userBlogs.map(blog => ({
        ...blog,
        blogContent: shortenBlogContent(blog.blogContent),
    }));

    return userBlogsShortened
}

exports.deleteBlogById = async (blogId) => {
    try {
        const response = await axios.delete(`${JSON_SERVER_API_URL}/blogs/${blogId}`);
        if (response.status === 200) {
            console.log('Blog post deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
    }
}