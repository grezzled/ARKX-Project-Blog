const { buildUser } = require('./userModel')
const sanitizer = require('../../utils/sanitizer')
const validator = require('../../utils/validator')
const { idMaker } = require('../../utils/utils.helper')

const makeUser = buildUser({ sanitizer, validator, idMaker })

module.exports = { makeUser }



