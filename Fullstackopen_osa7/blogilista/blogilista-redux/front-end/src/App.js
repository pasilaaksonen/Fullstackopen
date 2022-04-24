import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './index.css'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import Users from './components/Users'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogsUpdateToggle, setBlogsUpdateToggle ] = useState(false)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  
  const successmessage = useSelector(({ successmessage }) => {
    return successmessage
  })

  const errorMessage = useSelector(({ errormessage }) => {
    return errormessage
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [blogsUpdateToggle, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const user = useSelector(({ user }) => {
    return user
  })

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm
        blogFormRef={blogFormRef}
        blogsUpdateToggle={blogsUpdateToggle}
        setBlogsUpdateToggle={setBlogsUpdateToggle}
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
      { !user ?
        <div>
          <h2>login to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>Blog application</h2>
          <Router>
            <div className="navigation">
              <Link style={padding} to="/blogs">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              {user.name} logged in<button onClick={handleLogOut}>logout</button>
            </div>
            <Switch>
              <Route path="/blogs">
                {blogForm()}
                <Blog
                  blogForm={blogForm}
                  handleUpdateLikes={handleUpdateLikes}
                  blogsUpdateToggle={blogsUpdateToggle}
                  setBlogsUpdateToggle={setBlogsUpdateToggle}
                  user={user.username}
                />
              </Route>
            </Switch>
            <Switch>
              <Route path="/users">
                <Users />
              </Route>
            </Switch>
          </Router>
        </div>
      }
    </div>
  )
}

export default App