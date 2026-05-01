const express = require("express");
const router = express.Router();
const Movie = require("./models/movie.js");

router.get('/recommendation', async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in to view recommendations');
        return res.redirect('/login');
    }
    try {
        const { movies: recommendedMovies, topGenre } = await getRecommendedMovies();
        res.render('recommended', { movies: recommendedMovies, recommendedGenre: topGenre });
    } catch (err) {
        console.error("Error fetching recommended movies:", err);
        res.render('recommended', { movies: [], recommendedGenre: "" });
    }
});
