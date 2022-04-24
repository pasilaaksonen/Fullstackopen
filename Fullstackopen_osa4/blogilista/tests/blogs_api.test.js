const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('field id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    
    const response1 = await api.get('/api/blogs')
    const initialBlogs = response1.body
    // console.log(initialBlogs)
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 10,
      user: "60eb3d80dc9db3362446f418"
    }
  
    await api
      .post('/api/blogs')
      .set({ Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QyIiwiaWQiOiI2MGVjODFjZWU4ODdkZDU2MjQyNTU0MjYiLCJpYXQiOjE2MjYxMTI0OTB9.aLGgZ0djL4nmpFme97Y_0CKHHzwwOdN_CUhu1djiIBI" })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  
    const response2 = await api.get('/api/blogs')
    console.log(response2.body)
    const authors = response2.body.map(r => r.author)
  
    expect(response2.body).toHaveLength(initialBlogs.length + 1)
    expect(authors[initialBlogs.length]).toContain(
      'test author'
    )
})

test('0 is default value for undefined likes', async () => {
    
    const response1 = await api.get('/api/blogs')
    const initialBlogs = response1.body
    
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  
    const response2 = await api.get('/api/blogs')
  
    const likeFields = response2.body.map(r => r.likes)

    expect(likeFields[initialBlogs.length]).toBe(0)
})

test('undefined title or/and url returns status code 400', async () => {
    
    const newBlog = {
        author: 'test author',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
})

afterAll(() => {
  mongoose.connection.close()
})