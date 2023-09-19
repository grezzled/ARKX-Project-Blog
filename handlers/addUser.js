const { makeUser } = require('../models')

module.exports = function makeAddUser(db) {
    return function addUser(userInfo) {
        const userData = makeUser(userInfo)
        db.insert(userData)
    }
}
