const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }

export const notificationChange = (notification, seconds) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    notification = ''
    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      })
  }, seconds * 1000)
  }
}
  
export default notificationReducer