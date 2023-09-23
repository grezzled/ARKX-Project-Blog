exports.buildUser = ({ validator, sanitizer, idMaker } = {}) => {
    return function makeUser({
        userId,
        username,
        email,
        password,
        salary,
        role,
        active,
        inHold
    }) {
        console.log("ENTITY:", username, email, password)
        return Object.freeze({
            getUserId: () => idMaker(),
            getUsername: () => username,
            getEmail: () => email,
            getPassword: () => password,
            getSalary: () => salary,
            getRole: () => role,
            getActive: () => active,
            getInHold: () => inHold
        })
    }
}