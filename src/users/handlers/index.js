const makeAddUser = require('./addUser')
const makeEditUser = require('./editUser')
const makeListUsers = require('./listUsers')
const db = require('../../../db/userData')

exports.addUser = makeAddUser({ db })
exports.editUser = makeEditUser({ db })
exports.listUsers = makeListUsers({ db })

