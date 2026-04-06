const mongoose = require('mongoose');
const { getRecommendedMovies } = require('./utils/recommendationEngine');

mongoose.connect('mongodb://127.0.0.1:27017/ai-moviela').then(async () => {
    console.log("Connected");
    try {
        const res = await getRecommendedMovies();
        console.log("Success", res.movies.length);
    } catch(e) {
        console.error("Error", e);
    }
    process.exit();
});
