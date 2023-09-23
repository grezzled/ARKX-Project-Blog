require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const validateJson = require('./middlewares/validateJson')
const validateToken = require('./middlewares/validateToken')
const { postUser, notFound } = require('./src/users/controllers')
const makeCallback = require('./utils/httpCallback')
const mongoDB = require('./db/mongoDB')
const { server } = require('./config/config')

const apiRoot = process.env.DM_API_ROOT
const app = express()

//* Middlewares
app.use(morgan("default", {}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(validateJson)


//* User Routes
const usersRouter = require('./routes/users');
app.use(`${apiRoot}/users`, validateToken, usersRouter)

//* 404
app.use(makeCallback(notFound))

//* connect to database 
mongoDB.connection().connectToMongo()

//* start server
app.listen(server.PORT, () => {
    console.log(`Server is listening to ${server.hostname}:${server.PORT}`)
})
