const makeAddUser = require('./addUser')
const dataAccessUser = require('../data/dataAccessUser')

exports.addUser = makeAddUser(dataAccessUser)

