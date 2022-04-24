import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { successMessageChange } from '../reducers/successMessageReducer'
import { errorMessageChange } from '../reducers/errorMessageReducer'
// import { initializeUserBlogs } from '../reducers/userBlogsReducer'


const Blog = ({ blogsUpdateToggle, setBlogsUpdateToggle, user, handleUpdateLikes }) => {

  const dispatch = useDispatch()
  
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  // const handleSortBlogs = (blogs) => {
  //   const users = []
  //   let sortBlogs = []
  //   //Listaa kaikki blogien kirjoittajat (ei kopioita)
  //   blogs.forEach(blog => {
  //     if (!users.includes(blog.user.name)) {
  //       users.push(blog.user.name)
  //     }
  //   })
  //   //Käy läpi blogit, filtteröi kirjoittajien perusteella
  //   users.forEach(user => {
  //     const sortedBlogs = blogs.filter(blog => blog.user.name === user)
  //     sortBlogs = [...sortBlogs, {name: user, blogs: sortedBlogs.length}]
  //   })
  //   dispatch(initializeUserBlogs(sortBlogs))
  // }

  // useEffect(() => {
  //   handleSortBlogs(blogs)
  // }, [])

  // const userblogs = useSelector(({ userblogs }) => {
  //   return userblogs
  // })

  const [activeIndexes, setActiveIndexes] = useState(new Set())

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibilityButton = (index) => (
    <button onClick={() => {
      const newIndexes = new Set(activeIndexes)
      if (activeIndexes.has(index)) {
        newIndexes.delete(index)
      } else {
        newIndexes.add(index)
      }
      setActiveIndexes(newIndexes)
    }}>

      {activeIndexes.has(index) ? 'hide' : 'view'}
    </button>
  )

  const handleDeleteBlog = async blog => {

    let result = window.confirm(`Delete blog "${blog.title}"?`)
    if (result) {
      try {
        await blogService.deleteBlog(blog.id)
        dispatch(successMessageChange(`Succesfully deleted blog "${blog.title}"`, 3))
        setBlogsUpdateToggle(!blogsUpdateToggle)
      } catch (exception) {
        dispatch(errorMessageChange('Error occured or you are not authorized to delete this blog', 3))
      }
    }
  }

  return (
    <>
      <h2>List of blogs</h2>

      {blogs.map((blog, index) =>
        <div style={blogStyle} key={blog.id}>
          {activeIndexes.has(index) ?
            <div>
              {blog.title} {blog.author} {visibilityButton(index)}<br />
              {blog.url}<br />
              {blog.likes} <button onClick={() => handleUpdateLikes(blog)}>like</button><br />
              {blog.user.name}<br />
              {blog.user.username === user && <button onClick={() => handleDeleteBlog(blog)}>remove</button>}
            </div>
            :
            <div>
              {blog.title} {blog.author} {visibilityButton(index)}
            </div>
          }
        </div>
      )}

      {/* <h2>Users</h2>
      { userblogs ?
        userblogs.map(user =>
          <p key={user.name}>{user.name} {user.blogs}</p>
        )
        :
        <p>nothing to show</p>
      } */}
      
    </>
  )
}

export default Blog