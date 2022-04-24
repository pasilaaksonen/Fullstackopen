import React from 'react'

const Notification2 = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
      }
    
    return (
    <div className="error">
        {errorMessage}
    </div>
    )
}

export default Notification2
