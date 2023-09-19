module.exports = function () {
    return function makeUser({
        username,
        password,
    }) {
        
        //todo Validate username and password 

        return Object.freeze({
            getUsername: () => username,
            getPassword: () => password
        })
    }
}