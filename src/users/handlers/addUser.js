const { makeUser } = require('..')

module.exports = function makeAddUser({ db }) {
    return function addUser(userInfo) {
        console.log("HANDLER:", userInfo)
        const userData = makeUser(userInfo)
        console.log("HANDLER:", userData)

        return db.insert({
            userId: userData.getUserId(),
            username: userData.getUsername(),
            email: userData.getEmail(),
            password: userData.getPassword(),
            salary: userData.getSalary(),
            role: userData.getRole(),
            active: userData.getActive(),
            inHold: userData.getInHold(),
        })
    }
}
