import React from 'react'

const Filter = ({ setSearchWith }) => {
    return (
        <>
          filter shown with <input onChange={(e) => setSearchWith(e.target.value)} />  
        </>
    )
}

export default Filter
