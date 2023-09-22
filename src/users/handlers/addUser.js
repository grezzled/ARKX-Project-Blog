const { makeUser } = require('..')

module.exports = function makeAddUser({ db }) {
    return function addUser(userInfo) {
        console.log("HANDLER:", userInfo)
        const userData = makeUser(userInfo)
        return db.insert({
            username: userData.getUsername(),
            email: userData.getEmail(),
            password: userData.getPassword(),
        })
    }
}
