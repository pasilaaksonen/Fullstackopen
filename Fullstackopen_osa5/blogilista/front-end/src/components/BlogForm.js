import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setErrorMessage, setSuccessmessage, setBlogs, blogFormRef }) => {
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        newAuthor, newTitle, newUrl
      })
      setSuccessmessage(`a new blog "${newTitle}" added`)
      setTimeout(() => {setSuccessmessage(null)}, 3000)
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage('Failed to add new blog, check fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    console.log('Added new blog')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
                title:
          <input
            id='title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
                author:
          <input
            id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
                url:
          <input
            id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit" id="blog-submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm