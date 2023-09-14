const axios = require('axios')

const JSON_SERVER_API_URL = 'http://localhost:3000'

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
