const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Show Details Route
router.get('/movie-la/show/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.render('show.ejs', { movie });
  } catch (err) {
    console.error("❌ Error fetching movie:", err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;