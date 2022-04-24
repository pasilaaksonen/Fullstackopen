import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationSetter = () => {
    if (!props.notification) {
      return null
    }
    return props.notification
  }
  
  const notification = notificationSetter()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {notification ?
        <div style={style}>
          {notification}
        </div>
        :
        <div></div>
      } 
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification