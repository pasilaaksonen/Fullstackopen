import React from 'react'
import BornForm from './BornForm'

const Authors = (props) => {
  
  // console.log(props.authorData.allAuthors)
  let authorData = []
  
  if (props.authorData.allAuthors) {
    authorData = props.authorData.allAuthors
  }

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorData.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.authorBookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BornForm dropDownList={props.dropDownList} />
    </div>
  )
}

export default Authors