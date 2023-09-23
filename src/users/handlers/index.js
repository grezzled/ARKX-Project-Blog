const makeAddUser = require('./addUser')
const makeEditUser = require('./editUser')
const db = require('../../../db/userData')

exports.addUser = makeAddUser({ db })
exports.editUser = makeEditUser({ db })

