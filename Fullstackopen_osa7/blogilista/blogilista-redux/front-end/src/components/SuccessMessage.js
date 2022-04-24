import React from 'react'

const SuccessMessage = ({ successmessage }) => {
  if (successmessage === null) {
    return null
  }

  return (
    <div className="message">
      {successmessage}
    </div>
  )
}

export default SuccessMessage