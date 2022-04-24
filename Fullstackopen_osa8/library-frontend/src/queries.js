import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      authorBookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre)  {
      title,
      published,
      id,
      genres,
      authorName
    }
  }
`

export const CREATE_BOOK = gql `
mutation createBook($title: String!, $author: String, $published: String!, $genres: [String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    id,
    published,
    genres
  }
}
`

export const EDIT_AUTHOR= gql`
  mutation editAuthor($name: String!, $born: String!) {
    editAuthor(
        name: $name, 
        born: $born
    ) {
      name,
      born,
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      username
      favoriteGenre
    }
  }
`