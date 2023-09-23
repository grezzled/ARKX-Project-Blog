exports.buildUser = ({ validator, sanitizer, idMaker } = {}) => {
    return function makeUser({
        userId,
        username,
        email,
        password,
    }) {
        console.log("idMaker", idMaker())
        console.log("ENTITY:", username, email, password)
        return Object.freeze({
            getUserId: () => idMaker(),
            getUsername: () => username,
            getEmail: () => email,
            getPassword: () => password,
        })
    }
}