import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Favorites from './components/Favorites'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'

import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const result1 = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [authorData, setAuthorData] = useState([])
  const [bookData, setBookData] = useState([])
  const [dropDownList, setDropDownList] = useState([])
  const [resetPage, setResetPage] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    if (result1.data) {
      setAuthorData(result1.data)
    }
  }, [result1])

  useEffect(() => {
    if (result2.data) {
      setBookData(result2.data)
    }
  }, [result2])

  useEffect(() => {
    if(authorData.allAuthors) {
        setDropDownList(authorData.allAuthors.map(author => {
            return {value: author.name, label: author.name}  
    }))
  }
}, [authorData])

const logout = () => {       
  localStorage.clear()    
  client.resetStore()  
  setToken(null) 
}


  
if (!token) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setFavoriteGenre={setFavoriteGenre}
      />
      <Authors
        show={page === 'authors'}
        authorData={authorData}
        dropDownList = {dropDownList}
      />
      <Books
        show={page === 'books'}
        bookData = {bookData}
        resetPage={resetPage}
        setResetPage={setResetPage}
      />
    </div>
  )
}

return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('favorites')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        authorData={authorData}
        dropDownList = {dropDownList}
      />

      <Books
        show={page === 'books'}
        bookData = {bookData}
        resetPage={resetPage}
        setResetPage={setResetPage}
      />

      <NewBook
        show={page === 'add'}
        resetPage={resetPage}
        setResetPage={setResetPage}
      />

      <Favorites
        show={page === 'favorites'}
        bookData = {bookData}
        favoriteGenre={favoriteGenre}
      />

    </div>
  )
}

export default App