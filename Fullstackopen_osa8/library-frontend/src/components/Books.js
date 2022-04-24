import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [showByGenre, setShowByGenre] = useState("")
  const [shownData, setShownData] = useState([])
  const [genreButtons, setGenreButtons] = useState([])
  
  const {data} = useQuery(ALL_BOOKS, {
    variables: {genre: showByGenre}
  });

  useEffect(() => {
    if (data && showByGenre) {
      setShownData(data.allBooks)
    } else {
      setShownData(props.bookData.allBooks) 
    }
  }, [data])
  
  useEffect(() => {
    let genres = []
    if (props.bookData.allBooks) {
        props.bookData.allBooks.forEach(book => {
            book.genres.forEach(genre => {
                if (!genres.includes(genre)) {
                genres.push(genre)
                }
            })
        })
        setGenreButtons(genres)
    }
  }, [props.bookData.allBooks])

  // console.log(genres)
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
          {shownData.map((a, index) =>
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.authorName}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
          {genreButtons.map((g,index) =>
            <button key={index} onClick={() => setShowByGenre(g)}>{g}</button>
          )}
          <button onClick={() => setShowByGenre("")}>all genres</button>
    </div>
  )
}

export default Books