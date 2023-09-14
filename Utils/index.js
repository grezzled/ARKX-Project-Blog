const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

const makeSalt = (saltRounds = 10) => {
  return bcrypt.genSaltSync(saltRounds, 'a')
}

const makeHash = (input, salt) => {
  return bcrypt.hashSync(input, salt)
}

const generateUsername = () => {
  const usernameGenerator = require('username-generator');
  return usernameGenerator.generateUsername()
}

exports.generator = {
  generateUsername: generateUsername
}

exports.hash = {
  makeHash: makeHash,
  makeSalt: makeSalt
}

exports.validator = {
  validateEmail: (email) => "this is a valid email",
  validatePassword: (password) => "this is a valid password"
}

exports.makeExpressCallback = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        // if (httpResponse.headers) {
        //   res.set(httpResponse.headers)
        // }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
    .catch(e => res.status(500).send({ error: 'An unkown error occurred.'}))
  }
}

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed'+error);
  }
}