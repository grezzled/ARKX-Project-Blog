exports.addBlog = async (blogData) => {
    return await axios.post('http://localhost:3000/blogs', blogData);
}
