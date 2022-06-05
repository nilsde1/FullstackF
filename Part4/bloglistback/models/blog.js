const mongoose = require('mongoose')

const blogModel = new mongoose.Schema({
  url: String,
  title: String,
  author: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
})

blogModel.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blogs', blogModel)

module.exports = Blog