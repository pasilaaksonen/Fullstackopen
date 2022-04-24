import React from 'react'
import { useSelector } from 'react-redux'

function Users() {

  const userblogs = useSelector(({ userblogs }) => {
    return userblogs
  })

  return (
    <div>
      <h2>Users</h2>
      { userblogs ?
        userblogs.map(user =>
          <p key={user.name}>name: {user.name} <br/> blogs: {user.blogs}</p>
        )
        :
        <p>nothing to show</p>
      }
    </div>
  )
}

export default Users
