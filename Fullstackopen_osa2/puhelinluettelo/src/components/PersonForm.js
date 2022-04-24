import React from 'react'

const PersonForm = ({ setNewName, setNewNumber }) => {
    return (
        <>
            <div>
                name: <input onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
                number: <input onChange={(e) => setNewNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>  
        </>
    )
}

export default PersonForm
