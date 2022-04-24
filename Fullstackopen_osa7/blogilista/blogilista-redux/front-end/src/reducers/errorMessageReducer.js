const errorMessageReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_ERRORMESSAGE':
    return action.message
  default:
    return state
  }
}

export const errorMessageChange = (message, seconds) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_ERRORMESSAGE',
      message
    })
    message = ''
    await setTimeout(() => {
      dispatch({
        type: 'SET_ERRORMESSAGE',
        message
      })
    }, seconds * 1000)
  }
}
  
export default errorMessageReducer