//* Load .env file
require('dotenv').config()

const express = require('express')
const app = express()
const config = require('./Config/config')
const server = require('json-server')


//* Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + config.staticFolderPath, { maxAge: 36000 }))
app.use(require('helmet')(config.helmetOptions))
if (config.compressionEnabled)
    app.use(require('compression')())
app.use(require('morgan')("default", config.helmetOptions))

//* ejs view engine
app.set('view engine', config.viewEngine)

//* Auth Router
const authRoutes = require('./Routes/auth')
app.use('/auth', authRoutes)

//* Blog Router
const blogRoutes = require('./Routes/blog')
app.use('/', blogRoutes)

//* Start Server
app.listen(process.env.PORT, () => console.log(`Server running on PORT ${process.env.PORT}`))