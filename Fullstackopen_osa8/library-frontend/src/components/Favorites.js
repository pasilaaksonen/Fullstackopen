import React, { useState, useEffect } from 'react'

const Favorites = (props) => {
  const [shownData, setShownData] = useState([])

  useEffect(() => {
    let bookData = []
    if (props.bookData.allBooks) {
      bookData = props.bookData.allBooks.filter(book => book.genres.includes(props.favoriteGenre))
      setShownData(bookData)
    } 
  }, [props.bookData.allBooks,props.favoriteGenre])
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{props.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {shownData.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.authorName}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Favorites