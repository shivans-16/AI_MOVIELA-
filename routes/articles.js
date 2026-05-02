const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = 'a72e8af8';

router.get('/', (req, res) => {
  res.render('articles/index', { title: 'Search Articles' });
});

router.get('/read/:imdbID', async (req, res) => {
  try {
    const { imdbID } = req.params;
    const omdbRes = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
    
    if (omdbRes.data.Response === 'False') {
      req.flash('error', 'Article not found.');
      return res.redirect('/articles');
    }

    res.render('articles/read', { 
      title: omdbRes.data.Title + ' - Article', 
      article: omdbRes.data 
    });
  } catch (err) {
    req.flash('error', 'Failed to fetch article details.');
    res.redirect('/articles');
  }
});

module.exports = router;
