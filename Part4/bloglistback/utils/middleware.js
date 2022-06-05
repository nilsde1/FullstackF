const logger = require('./logger')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (anf, ans) => {
  ans.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, anf, ans, next) => {
  if (error.name === 'CastError') {
    return ans.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return ans.status(400).json({ error: error.message })
  } 
  else if (error.name === 'JsonWebTokenError') {
    return ans.status(401).json({ error: 'invalid token' })
  }
   else if (error.name === 'TokenExpiredError') {
    return ans.status(401).json({error: 'token expired'})
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor  = (anf, ans, next) => {
  const authorization = anf.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    anf.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (anf, ans, next) => {
  const decodedToken = jwt.verify(anf.token, process.env.SECRET)
  if (!anf.token || !decodedToken.id) {
    
    return ans.status(401).json({ error: 'Missing/invalid token' })
  } else {


    anf.user = await User.findById(decodedToken.id)
  }

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}