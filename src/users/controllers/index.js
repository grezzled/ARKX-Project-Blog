const { makePostUser } = require('./postUser')
const { addUser } = require('../handlers')
const { notFound } = require('./notFound')
const responseHelper = require('../../../utils/response.helper')
const postUser = makePostUser({ addUser, responseHelper })

module.exports = Object.freeze({
    postUser,
    notFound
})

