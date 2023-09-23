const { makeUser } = require('..')

module.exports = function makeListUsers({ db }) {
    return async function listUsers() {
        const users = await db.getAll()
        return users
    }
}
