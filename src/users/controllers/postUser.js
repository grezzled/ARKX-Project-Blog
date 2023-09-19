const { addUser } = require('./handlers')

module.exports = function makePostUser(httpRequest) {
    return function postUser(userInfo) {
        addUser(userInfo)
    }
}