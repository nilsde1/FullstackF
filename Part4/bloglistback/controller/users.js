const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get("/", async (anf, ans) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 })
  
  
  
  
  ans.json(users)
})

usersRouter.post('/', async (anf, ans) => {
  const { username, name, password } = anf.body
  
  if (!username || !password) {
    return ans.status(400).json({
      error: 'Pleas fill in username or password'
    })
  }
  
 
  
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return ans.status(400).json({
      error: 'not a special username'
    })
  }
   if (password.length < 4) {
    return ans.status(400).json({
      error: 'Password to short, must be more then 3 characters'
    })
  }
  const Rounds = 10
  const passwordHash = await bcrypt.hash(password, Rounds)
  
  const user = new User({
    username,
    name,
    passwordHash,
  })
  
  const savedUser = await user.save()
  
  ans.status(201).json(savedUser)
})

module.exports = usersRouter