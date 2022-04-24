const userBlogsReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_USERBLOGS':
    return action.data
  default:
    return state
  }
}
  
export const initializeUserBlogs = (userBlogs) => {
  return {
    type: 'SET_USERBLOGS',
    data: userBlogs,
  }
}
  
export default userBlogsReducer