const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {

  try {
    //Blog data from request
    const body = new Blog(request.body)

    //Search user by decoded token id
    const user = await User.findById(request.user)

    //Creates new blog with the body data
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    //If url or title is missing, causes error
    if (!blog.url || !blog.title) {
      response.sendStatus(400)
    } else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)  
      await user.save()
      response.json(savedBlog.toJSON())
    }
  } catch(error) {
    //In case token is wrong
    if (error.name === 'JsonWebTokenError')
      return response.status(401).json({ error: error.message })
}
})

blogsRouter.delete('/:id', async (request, response) => {


  const blog = await Blog.findById(request.params.id)
  const userID = blog.user.toString()
  
  //If token does not exist or doesn't include id, it will cause error
  if (!request.token || !request.user) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }

  //Checks if user is authorized to remove the blog
  if (userID !== request.user) {    
    return response.status(401).json({ error: 'not authorized to remove this blog' })  
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes })
  response.json(updatedBlog)
})

module.exports = blogsRouter