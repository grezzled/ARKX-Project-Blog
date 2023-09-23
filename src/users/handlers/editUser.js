const { makeUser } = require('..')
module.exports = function makeEditUser({ db }) {
    return async function editUser({ userId, ...changes } = {}) {
        if (!userId) {
            throw new Error('You must supply a user id')
        }



        //* check if there are changes in the object other than "source" 
        //* this one is always exist 
        console.log('Keys', Object.keys(changes).length)
        if (!Object.keys(changes).length > 1) {
            throw new Error('You must supply changes');
        }

        const existing = await db.findById(userId)

        if (!existing) {
            throw new RangeError('User not found.')
        }

        const user = makeUser({ ...existing, ...changes })

        const updated = await db.update(userId, {
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword(),
            salary: user.getSalary(),
            role: user.getRole(),
            active: user.getActive(),
            inHold: user.getInHold(),
        })

        return { existing, updated }
    }
}