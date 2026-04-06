const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['Action', 'Romance', 'Horror', 'Sci-Fi', 'Comedy','Biography', 'Thriller', 'Adventure','Drama', 'Animation','Crime', 'Fantasy', 'Documentary']
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Movie', movieSchema);