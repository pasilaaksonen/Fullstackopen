import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './index.css'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successmessage, setSuccessmessage ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogsUpdateToggle, setBlogsUpdateToggle ] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function (a,b) {
        return b.likes - a.likes
      }))
    )
  }, [setBlogs, blogsUpdateToggle])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
        setErrorMessage={setErrorMessage}
        setSuccessmessage={setSuccessmessage}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm
        setErrorMessage={setErrorMessage}
        setSuccessmessage={setSuccessmessage}
        setBlogs={setBlogs}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const handleUpdateLikes = async blog => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    await blogService.updateLikes(blogToUpdate,id)
    setBlogsUpdateToggle(!blogsUpdateToggle)
  }

  return (
    <div>
      {successmessage && <SuccessMessage successmessage={successmessage} />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {user === null ?
        <div>
          <h2>login to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>Blog application</h2>
          <p>{user.name} logged in<button onClick={handleLogOut}>logout</button></p>
          {blogForm()}
          <Blog
            blogs={blogs}
            handleUpdateLikes={handleUpdateLikes}
            setBlogs={setBlogs}
            blogsUpdateToggle={blogsUpdateToggle}
            setBlogsUpdateToggle={setBlogsUpdateToggle}
            user={user.username}
            setErrorMessage={setErrorMessage}
            setSuccessmessage={setSuccessmessage}
          />
        </div>
      }
    </div>
  )
}

export default App