const makeAddUser = require('./addUser')
const db = require('../../../db/userData')

exports.addUser = makeAddUser({ db })

