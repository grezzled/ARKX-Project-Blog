const { makePostUser } = require('./postUser')
const { makePatchUser } = require('./patchUser')
const { addUser, editUser } = require('../handlers')
const { notFound } = require('./notFound')
const responseHelper = require('../../../utils/response.helper')

const postUser = makePostUser({ addUser, responseHelper })
const patchUser = makePatchUser({ editUser, responseHelper })

module.exports = Object.freeze({
    postUser,
    patchUser,
    notFound
})

