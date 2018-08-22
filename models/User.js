const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  saved_businesses: [
    {
      favourites: {
        type: Schema.Types.ObjectId,
        ref: 'favourites'
      }
    }
  ]
})

module.exports = mongoose.model('users', UserSchema)