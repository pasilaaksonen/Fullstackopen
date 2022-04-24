import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BornForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const selectInputRef = useRef('')

  const [ editBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]  
  })

  const submit = async (event) => {
    event.preventDefault()

    editBorn({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  const handleChangeName = (e) => {
    if (e.value) {
      setName(e.value)
    }
  }

  return (
    <div>
      <h2>change birth year</h2>
      <form onSubmit={submit}>
        <Select ref={selectInputRef} options={props.dropDownList} onChange={(e) => handleChangeName(e)} />
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change born</button>
      </form>
    </div>
  )
}

export default BornForm