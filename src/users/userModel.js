exports.buildUser = ({ } = {}) => {
    return function makeUser({
        username,
        email,
        password,
    }) {
        console.log("ENTITY:", username, email, password)
        return Object.freeze({
            getUsername: () => username,
            getEmail: () => email,
            getPassword: () => password,
        })
    }
}