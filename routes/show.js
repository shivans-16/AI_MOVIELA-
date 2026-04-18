const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const axios = require('axios');

// Show Details Route
router.get('/movie-la/show/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // Fetch extra data from OMDb for Ratings and IMDb ID
    let externalData = {
      imdbID: null,
      ratings: [],
      plot: movie.description || ""
    };

    try {
      const apiKey = "a72e8af8"; // From existing code
      const omdbRes = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movie.title)}&y=${movie.year}`);
      
      if (omdbRes.data && omdbRes.data.Response === "True") {
        externalData.imdbID = omdbRes.data.imdbID;
        externalData.ratings = omdbRes.data.Ratings || [];
        if (!movie.description) {
          externalData.plot = omdbRes.data.Plot;
        }
      }
    } catch (apiErr) {
      console.error("⚠️ OMDb API error (non-critical):", apiErr.message);
    }

    // Construct IMDb URL
    const imdbUrl = externalData.imdbID ? `https://www.imdb.com/title/${externalData.imdbID}/` : `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

    res.render('show.ejs', { movie, externalData, imdbUrl });
  } catch (err) {
    console.error("❌ Error fetching movie:", err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;