const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  title: String,
  genre:String,
  releaseYear: Number,
  description:String,
  image: String
});

module.exports = mongoose.model('Wishlist', wishlistSchema);