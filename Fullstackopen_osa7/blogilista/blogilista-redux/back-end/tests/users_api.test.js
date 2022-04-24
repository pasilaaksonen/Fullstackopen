const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
  
  test('creation fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(result.body.error).toContain('`username` to be unique')
  })

  test('creation fails with proper statuscode and message if created password is under 3 characters long', async () => {

    const newUser = {
      username: 'root2',
      name: 'Superuser2',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
    expect(result.body.error).toContain('password missing or too short')
  })

  test('creation fails with proper statuscode and message if there is no password defined', async () => {

    const newUser = {
      username: 'root2',
      name: 'Superuser2',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
    expect(result.body.error).toContain('password missing or too short')
  })

  afterAll(() => {
    mongoose.connection.close()
  })