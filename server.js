require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { postUser, notFound } = require('./src/users/controllers')
const makeCallback = require('./utils/httpCallback')
const mongoDB = require('./db/mongoDB')
const { server } = require('./config/config')

const apiRoot = process.env.DM_API_ROOT
const app = express()

//* Middlewares
app.use(morgan("default", {}))
app.use(express.json())


//* Routes
app.post(`${apiRoot}/users`, makeCallback(postUser))

//* 404
app.use(makeCallback(notFound))

//* connect to database 
mongoDB.connection().connectToMongo()

//* start server
app.listen(server.PORT, () => {
    console.log(`Server is listening to ${server.hostname}:${server.PORT}`)
})
