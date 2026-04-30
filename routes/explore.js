const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiKey = "a72e8af8";

// OMDb API se movies fetch karne ka helper function
async function fetchMovies(imdbIds) {
  try {
    const promises = imdbIds.map(id => axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`));
    const results = await Promise.all(promises);
    return results
      .filter(res => res.data && res.data.Response === "True")
      .map(res => ({
        imdbID: res.data.imdbID,
        title: res.data.Title,
        releaseYear: res.data.Year,
        image: res.data.Poster !== "N/A" ? res.data.Poster : "/images/default.jpg"
      }));
  } catch (err) {
    console.error("Error fetching OMDb movies:", err.message);
    return [];
  }
}

router.get('/explore', async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to explore movies');
    return res.redirect('/login');
  }

  // Categories ke liye predefined IMDb IDs
  const superHeroIds = ['tt0468569', 'tt4154796', 'tt0371746', 'tt1877830', 'tt10872600', 'tt3896198', 'tt1160419', 'tt1825683'];
  const mafiaIds = ['tt0068646', 'tt0099685', 'tt0086250', 'tt0071562', 'tt0119008', 'tt1302006', 'tt0112641', 'tt0087843'];
  const romanceIds = ['tt3783958', 'tt2674426', 'tt0332280', 'tt0120338', 'tt0414387', 'tt2582846', 'tt0422295', 'tt1981115'];
  const bollywoodIds = ['tt1187043', 'tt1568966', 'tt0112870', 'tt2338151', 'tt0169102', 'tt0362222', 'tt0986264', 'tt5074352'];

  const [superheroes, mafias, romance, bollywood] = await Promise.all([
    fetchMovies(superHeroIds),
    fetchMovies(mafiaIds),
    fetchMovies(romanceIds),
    fetchMovies(bollywoodIds)
  ]);

  res.render('explore.ejs', { 
    superheroes,
    mafias,
    romance,
    bollywood
  });
});

module.exports = router;