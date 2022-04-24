const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7)  
  }  
    next()
}

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7)
    const decodedToken = jwt.verify(request.token, config.SECRET)
    request.user = decodedToken.id
  }  
    next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}