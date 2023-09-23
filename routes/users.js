const express = require('express')
const router = express.Router()
const { postUser, patchUser, getUsers, notFound } = require('../src/users/controllers')
const makeCallback = require('../utils/httpCallback')

//* Add a new user to the database
router.get('/', makeCallback(getUsers))
router.post('/', makeCallback(postUser))
router.patch('/:userId', makeCallback(patchUser))

//* 404
router.use(makeCallback(notFound))

module.exports = router
