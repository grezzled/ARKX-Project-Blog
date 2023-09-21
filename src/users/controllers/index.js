const { makePostUser } = require('./postUser')
const { addUser } = require('../handlers')
const {notFound} = require('./notFound')
const postUser = makePostUser({ addUser })

module.exports = Object.freeze({
    postUser,
    notFound
})

