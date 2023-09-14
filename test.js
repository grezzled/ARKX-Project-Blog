const user = require('./Models')
const { hash } = require('./Utils')
const r = user.user({
    firstName: 'John',
    lastName: 'Smith',
    userName: 'JhonSmith',
    email: 'smith@example.com',
    password: 'password',
    image: 'http://example.com',
})

// console.log(hash.makeSalt(10))

console.log(r.getFirstName(),
    r.getLastName(),
    r.getUserName(),
    r.getEmail(),
    r.getSalt(),
    r.getPassword(),
    r.getHashedPassword(),
    r.getCreatedAt(),
    r.getLastLoginAt())