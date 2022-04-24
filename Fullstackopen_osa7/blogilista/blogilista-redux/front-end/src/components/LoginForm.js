import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { successMessageChange } from '../reducers/successMessageReducer'
import { errorMessageChange } from '../reducers/errorMessageReducer'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'

const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  setUsername,
  setPassword,
}) => {

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
      setUsername('')
      setPassword('')
      dispatch(successMessageChange('Succesfully logged in', 3))
    } catch (exception) {
      dispatch(errorMessageChange('wrong username or password', 3))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
                password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm