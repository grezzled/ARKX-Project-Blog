const { makeUser } = require('..')
module.exports = function makeEditUser({ db }) {
    return async function editUser({ userId, ...changes } = {}) {
        if (!userId) {
            throw new Error('You must supply a user id')
        }


        
        //* check if there are changes in the object other that "source" 
        //* this one is always exist 
        console.log('Keys',Object.keys(changes).length)
        if (!Object.keys(changes).length > 1) {
            throw new Error('You must supply changes');
        }

        const existing = await db.findById(userId)

        if (!existing) {
            throw new RangeError('User not found.')
        }

        const user = makeUser({ ...existing, ...changes })

        const updated = await db.update(userId, {
            userId: user.getUserId(),
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword(),
        })

        return { existing, updated }
    }
}