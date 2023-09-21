exports.buildUser = ({ } = {}) => {
    return function makeUser({
        username,
        password,
    }) {
        console.log("ENTITY:", username, password)
        return Object.freeze({
            getUsername: () => username,
            getPassword: () => password,
        })
    }
}