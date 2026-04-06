// routes/index.js
const express = require('express');
const router = express.Router();
const Movie = require("../models/movie");
const axios = require('axios');

router.get('/', async(req, res) => {
  try {
    let movies = await Movie.find({});
    
    // Fallback: If DB has no movies, fetch some trending ones from OMDb
    if (!movies || movies.length === 0) {
      try {
        const fallbacks = ["Avengers", "Joker", "Batman", "Inception", "Interstellar"];
        for (let q of fallbacks) {
          const apiRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&t=${encodeURIComponent(q)}`);
          if (apiRes.data && apiRes.data.Title) {
            movies.push({
              _id: "ext_" + Math.random().toString(36).substr(2, 9),
              title: apiRes.data.Title,
              releaseYear: parseInt(apiRes.data.Year) || 2000,
              genre: apiRes.data.Genre || "Unknown",
              image: apiRes.data.Poster !== "N/A" ? apiRes.data.Poster : "/images/default.jpg",
              description: apiRes.data.Plot || "Fetched from OMDb"
            });
          }
        }
      } catch (apiErr) {
        console.error("OMDb API error during fallback:", apiErr.message);
      }
    }
    
    res.render('index.ejs', { title: 'AI-MovieLA', movies });
  } catch(err) {
    console.error(err);
    res.render('index.ejs', { title: 'AI-MovieLA', movies: [] });
  }
});

module.exports = router;