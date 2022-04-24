import React from 'react'
import newContact from '../services/newContact'

const Persons = ({ personsToShow, setToggle, toggle, setStatusMessage }) => {

    const handleRemove = (id, name) => {
        
        let result = window.confirm(`Delete ${name}?`)

        if (result) {
            newContact
                .deleteOne(id)
            setTimeout(function(){ setToggle(!toggle); }, 100);
            setStatusMessage(`Deleted ${name}`)        
            setTimeout(() => {setStatusMessage(null)}, 5000)
        }
    }

    return (
        <>
            {personsToShow.map(person =>
            <p key={person.id}>{person.name} {person.number} <button onClick={() => handleRemove(person.id, person.name)}>delete</button></p>
            )}   
        </>
    )
}

export default Persons
