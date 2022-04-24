import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  setUser,
  setUsername,
  setPassword,
  setSuccessmessage,
  setErrorMessage
}) => {


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
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessmessage('Succesfully logged in')
      setTimeout(() => {setSuccessmessage(null)}, 3000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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