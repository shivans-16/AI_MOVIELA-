const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiKey = "a72e8af8";

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
        image: res.data.Poster !== "N/A" ? res.data.Poster : "/images/default.jpg",
        date: "Trending"
      }));
  } catch (err) {
    console.error("Error fetching OMDb movies:", err.message);
    return [];
  }
}

router.get('/trending', async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to view trending movies');
    return res.redirect('/login');
  }

  // Define popular movie IDs
  const bollywoodIds = ['tt12844910', 'tt15354916', 'tt13751694', 'tt5074352', 'tt1187043', 'tt2338151', 'tt15327088', 'tt8178634'];
  const hollywoodIds = ['tt15239678', 'tt15398776', 'tt1517268', 'tt9362722', 'tt1877830', 'tt1745960', 'tt10872600', 'tt1160419'];
  const southIds = ['tt8178634', 'tt10698680', 'tt9389998', 'tt4849438', 'tt15327088', 'tt9179430', 'tt10189314', 'tt8978646'];
  const koreanIds = ['tt6751668', 'tt5700672', 'tt10919420', 'tt0364569', 'tt21344706', 'tt10850932', 'tt13756018', 'tt8503618'];

  const [bollywood, hollywood, south, korean] = await Promise.all([
    fetchMovies(bollywoodIds),
    fetchMovies(hollywoodIds),
    fetchMovies(southIds),
    fetchMovies(koreanIds)
  ]);

  res.render('trending.ejs', {
    bollywood,
    hollywood,
    south,
    korean
  });
});

module.exports = router;