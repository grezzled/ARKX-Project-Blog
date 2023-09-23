const { makeUser } = require('..')
module.exports = function makeEditUser({ db }) {
    return async function editUser({ userId, ...changes } = {}) {
        if (!userId) {
            throw new Error('You must supply a user id')
        }

        if (!changes) {
            throw new Error('You must supply changes')
        }

        const existing = await db.findById({ userId })

        if (!existing) {
            throw new RangeError('User not found.')
        }

        const user = makeUser({ ...existing, ...changes })

        const updated = await db.update({
            userId: user.getUserId,
            username: userData.getUsername(),
            email: userData.getEmail(),
            password: userData.getPassword(),
        })

        return { ...existing, ...updated }
    }
}