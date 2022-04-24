import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { successMessageChange } from '../reducers/successMessageReducer'
import { errorMessageChange } from '../reducers/errorMessageReducer'

const BlogForm = ({ blogsUpdateToggle, setBlogsUpdateToggle, blogFormRef, blogForm }) => {
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newTitle, setNewTitle ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const dispatch = useDispatch()
  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        newAuthor, newTitle, newUrl
      })
      dispatch(successMessageChange(`a new blog "${newTitle}" added`, 3))
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
      setBlogsUpdateToggle(!blogsUpdateToggle)
    } catch (exception) {
      dispatch(errorMessageChange('Failed to add new blog, check fields', 3))
    }
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