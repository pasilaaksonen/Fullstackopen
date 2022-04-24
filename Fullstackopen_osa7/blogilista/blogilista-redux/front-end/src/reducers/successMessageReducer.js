const successMessageReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_SUCCESSMESSAGE':
    return action.message
  default:
    return state
  }
}

export const successMessageChange = (message, seconds) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_SUCCESSMESSAGE',
      message
    })
    message = ''
    await setTimeout(() => {
      dispatch({
        type: 'SET_SUCCESSMESSAGE',
        message
      })
    }, seconds * 1000)
  }
}
  
export default successMessageReducer