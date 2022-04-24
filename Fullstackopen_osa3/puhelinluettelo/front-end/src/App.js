import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import newContact from './services/newContact'
import Notification from './components/Notification'
import Notification2 from './components/Notification2'
import './index.css'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWith, setSearchWith ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ toggle, setToggle ] = useState(true)
  const [ statusMessage, setStatusMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  useEffect(() => {
    newContact
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    if (searchWith  !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }, [searchWith, toggle])

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toUpperCase().includes(searchWith.toUpperCase()))

  const handleSubmit = (e) => {
    e.preventDefault()
    let checkDuplicate = persons.filter((person) => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (checkDuplicate.length > 0) {

      let result = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
        if (result) {
          newContact
            .getAll()
            .then(response => {
              let items = response.data.filter(item => item.name === personObject.name)
              console.log(items)
              newContact
                .update(items[0], personObject)
                setTimeout(function(){ setToggle(!toggle); }, 100);
              setStatusMessage(`Edited contact ${personObject.name}`)        
              setTimeout(() => {setStatusMessage(null)}, 5000) 
            })
            .catch(error => {
              setErrorMessage(`Information of ${personObject.name} has already been removed from server`)        
              setTimeout(() => {setErrorMessage(null)}, 5000)
              return
            })    
        }
      return
    } else {
      newContact
        .create(personObject)
        .then(response => {      
          setPersons(persons.concat(response.data))
          setNewName('')
          setStatusMessage(`Added ${personObject.name}`)        
          setTimeout(() => {setStatusMessage(null)}, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)        
          setTimeout(() => {setErrorMessage(null)}, 5000)
          return
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
        <Notification message={statusMessage} />
        <Notification2 errorMessage={errorMessage} />
        <Filter setSearchWith={setSearchWith} />
      <form onSubmit={(e) => handleSubmit(e)}>
      <h2>add a new</h2>
        <PersonForm setNewName={setNewName} setNewNumber={setNewNumber} />
      </form>
      <h2>Numbers</h2>
        <Persons 
        personsToShow={personsToShow} 
        persons={persons} 
        setPersons={setPersons} 
        setToggle={setToggle} 
        toggle={toggle} 
        setStatusMessage={setStatusMessage}
        />
    </>
  )
}

export default App
