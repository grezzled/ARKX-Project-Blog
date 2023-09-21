const { buildUser } = require('./userModel');
const sanitizer = require('../../utils/sanitizer')
const validator = require('../../utils/validator');

const makeUser = buildUser({ sanitizer, validator })
module.exports = { makeUser }



