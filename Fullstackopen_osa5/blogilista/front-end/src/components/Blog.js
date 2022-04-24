import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, blogsUpdateToggle, setBlogsUpdateToggle, user, setErrorMessage, setSuccessmessage, handleUpdateLikes }) => {

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

  // const handleUpdateLikes = async blog => {
  //   const blogToUpdate = {
  //     user: blog.user.id,
  //     likes: blog.likes,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url
  //   }
  //   const id = blog.id
  //   await blogService.updateLikes(blogToUpdate,id)
  //   setBlogsUpdateToggle(!blogsUpdateToggle)
  // }

  const handleDeleteBlog = async blog => {

    let result = window.confirm(`Delete blog "${blog.title}"?`)
    if (result) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogsUpdateToggle(!blogsUpdateToggle)
        setSuccessmessage(`Succesfully deleted blog "${blog.title}"`)
        setTimeout(() => {setSuccessmessage(null)}, 3000)
      } catch (exception) {
        setErrorMessage('Error occured or you are not authorized to delete this blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
    </>
  )
}

export default Blog