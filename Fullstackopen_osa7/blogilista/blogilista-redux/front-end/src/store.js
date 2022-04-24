import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import successMessageReducer from './reducers/successMessageReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import userReducer from './reducers/userReducer'
import userBlogsReducer, { initializeUserBlogs } from './reducers/userBlogsReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  successmessage: successMessageReducer,
  errormessage: errorMessageReducer,
  userblogs: userBlogsReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

const handleSortBlogs = (blogs) => {
  const users = []
  let sortBlogs = []
  //Listaa kaikki blogien kirjoittajat (ei kopioita)
  blogs.forEach(blog => {
    if (!users.includes(blog.user.name)) {
      users.push(blog.user.name)
    }
  })
  //Käy läpi blogit, filtteröi kirjoittajien perusteella
  users.forEach(user => {
    const sortedBlogs = blogs.filter(blog => blog.user.name === user)
    sortBlogs = [...sortBlogs, {name: user, blogs: sortedBlogs.length}]
  })
  store.dispatch(initializeUserBlogs(sortBlogs))
}

blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)

blogService.getAll().then(blogs =>
  handleSortBlogs(blogs)
)

export default store