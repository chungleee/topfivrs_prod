const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavouriteSchema = new Schema({
  name: { type: String },
  address: { type: String },
  image_url: { type: String },
  rating: { type: Number },
  phone: { type: String }
})

module.exports = mongoose.model('favourites', FavouriteSchema)