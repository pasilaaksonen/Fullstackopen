const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/books')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGO_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
      username: String!
      favoriteGenre: String!
    }
    type Author {
        name: String!
        born: Int
        id: ID!
        authorBookCount: Int!
    }
    type Book {
      title: String!
      published: Int!
      authorName: String!
      genres: [String!]!
      id: ID!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        me: User
    }
    type Mutation {
      addBook(
        title: String!
        author: String
        published: String!
        genres: [String]!
      ): Book
      editAuthor(
        name: String
        born: String!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    } 
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.genre) {
          return Book.find({genres: { $in: [args.genre] }}).exec()
      }
      return Book.find({}).exec()
    },
    allAuthors: () => {
      return Author.find({}).exec()
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
      authorBookCount: object => {
        return Book.collection.countDocuments({ authorName: object.name });
      }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET), username: userForToken.username, favoriteGenre: userForToken.favoriteGenre }
    },
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      const book = new Book({ ...args, author: author._id, authorName: args.author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})