const { makePostUser } = require('./postUser')
const { makePatchUser } = require('./patchUser')
const { makeGetUsers } = require('./getUsers')
const { addUser, editUser, listUsers } = require('../handlers')
const { notFound } = require('./notFound')
const responseHelper = require('../../../utils/response.helper')

const postUser = makePostUser({ addUser, responseHelper })
const patchUser = makePatchUser({ editUser, responseHelper })
const getUsers = makeGetUsers({ listUsers, responseHelper })

module.exports = Object.freeze({
    postUser,
    patchUser,
    getUsers,
    notFound
})

