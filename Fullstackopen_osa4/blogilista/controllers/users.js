const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    try {
    if (!body.password || body.password.length < 3) {
      return response.status(401).json({ error: 'password missing or too short (needs to be at least 3 characters long)' }) 
    } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
} catch(error) {
  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })
}
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter