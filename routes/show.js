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

    // Fetch OMDb data
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

    // IMDb URL
    const imdbUrl = externalData.imdbID ? `https://www.imdb.com/title/${externalData.imdbID}/` : `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

    res.render('show.ejs', { movie, externalData, imdbUrl });
  } catch (err) {
    console.error("❌ Error fetching movie:", err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Import from OMDb Route
router.get('/movie-la/import-omdb/:imdbid', async (req, res) => {
  try {
    const imdbID = req.params.imdbid;
    const apiKey = "a72e8af8";
    
    const omdbRes = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    if (!omdbRes.data || omdbRes.data.Response === "False") {
      // If req.flash is available use it, else just redirect
      return res.redirect('back');
    }

    const { Title, Year, Poster, Genre } = omdbRes.data;
    
    // Parse Year
    const parsedYear = parseInt(Year) || new Date().getFullYear();
    
    // Check if movie already exists
    let movie = await Movie.findOne({ title: Title, year: parsedYear });
    
    if (movie) {
      return res.redirect(`/movie-la/show/${movie._id}`);
    }

    // Map OMDb Genre to closest valid enum
    const validGenres = ['Action', 'Romance', 'Horror', 'Sci-Fi', 'Comedy','Biography', 'Thriller', 'Adventure','Drama', 'Animation','Crime', 'Fantasy', 'Documentary'];
    let mappedGenre = 'Drama'; // fallback
    if (Genre && Genre !== "N/A") {
      const omdbGenres = Genre.split(',').map(g => g.trim());
      for (let g of omdbGenres) {
        if (validGenres.includes(g)) {
          mappedGenre = g;
          break;
        }
      }
    }

    // Create new movie
    movie = await Movie.create({
      title: Title,
      genre: mappedGenre,
      year: parsedYear,
      image: Poster && Poster !== "N/A" ? Poster : "/images/default.jpg"
    });

    res.redirect(`/movie-la/show/${movie._id}`);
  } catch (err) {
    console.error("❌ Error importing OMDb movie:", err.message);
    res.redirect('back');
  }
});

// Details Route
router.get('/movie-la/details/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    let fullData = { ...movie._doc };
    
    try {
      const apiKey = "a72e8af8";
      // Fetch full plot
      const omdbRes = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movie.title)}&y=${movie.year}&plot=full`);
      
      if (omdbRes.data && omdbRes.data.Response === "True") {
        fullData = { ...fullData, ...omdbRes.data };
      }
    } catch (apiErr) {
      console.error("⚠️ OMDb API error in details:", apiErr.message);
    }

    res.render('movie-details.ejs', { movie: fullData });
  } catch (err) {
    console.error("❌ Error fetching movie details:", err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;