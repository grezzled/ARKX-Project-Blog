//* Load .env file
require('dotenv').config() 

const express = require('express')
const app = express()
const config = require('./Config/config')
const cookieParser = require('cookie-parser'); // Import cookie-parser
const path = require('path');

//* Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + config.staticFolderPath, { maxAge: 36000 }))
// app.use(require('helmet')(config.helmetOptions))
if (config.compressionEnabled)
    app.use(require('compression')())
// app.use(require('morgan')("default", config.helmetOptions))
app.use(cookieParser());

//* ejs view engine
app.set('view engine', config.viewEngine)


//* Auth Router
const authRoutes = require('./Routes/auth')
app.use('/', authRoutes)

//* User Router
const userRoutes = require('./Routes/dashboard')
app.use('/', userRoutes)

//* Blog Router
const blogRoutes = require('./Routes/blog')
app.use('/', blogRoutes)

//* 404 Page
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, '/Public/html/404.html'))
})

//* default route
app.use((req, res) => {
    res.redirect('404')
})

//* Start Server
app.listen(process.env.PORT, () => console.log(`Server running on PORT ${process.env.PORT}`))