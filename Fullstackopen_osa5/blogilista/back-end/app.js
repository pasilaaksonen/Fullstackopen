const cors = require('cors')
const config = require('./utils/config')
const middlewares = require('./middleware/middlewares')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(middlewares.tokenExtractor)
app.use(cors())
app.use(express.json())
app.use('/api/blogs', middlewares.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {  
    const testingRouter = require('./controllers/testing')  
    app.use('/api/testing', testingRouter)
}

module.exports = app