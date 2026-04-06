const Wishlist = require('../models/wishlist');
const Movie = require('../models/movie');
const axios = require('axios');

async function getRecommendedMovies() {
  try {
    // 1. Fetch all wishlist items
    const wishItems = await Wishlist.find({});
    
    // 2. Determine most frequent genre
    let genreCounts = {};
    for (let item of wishItems) {
      if (item.genre && item.genre !== 'Unknown') {
        let g = item.genre.split(',')[0].trim(); // take primary genre
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      }
    }
    
    let topGenre = 'Action'; // default fallback
    let maxCount = 0;
    for (let g in genreCounts) {
      if (genreCounts[g] > maxCount) {
        maxCount = genreCounts[g];
        topGenre = g;
      }
    }

    // 3. Try fetching 3 movies matching that genre from DB
    let movies = await Movie.find({ genre: { $regex: topGenre, $options: "i" } }).limit(3);

    // 4. Fallback to OMDb if less than 3 are found
    if (movies.length < 3) {
      try {
        const apiRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&s=${encodeURIComponent(topGenre)}`);
        
        if (apiRes.data && apiRes.data.Search) {
          for (let m of apiRes.data.Search) {
            if (movies.length >= 3) break;
            
            // Check if already contains
            const exists = movies.some(dbM => dbM.title === m.Title);
            if (!exists) {
              movies.push({
                _id: "ext_" + Math.random().toString(36).substr(2, 9),
                title: m.Title,
                releaseYear: parseInt(m.Year) || 2000,
                genre: topGenre,
                image: m.Poster !== "N/A" ? m.Poster : "/images/default.jpg",
                description: "Recommended based on your Wishlist"
              });
            }
          }
        }
      } catch (e) {
        console.error("Error fetching recommendation fallback", e.message);
      }
    }
    
    return { movies, topGenre };
  } catch (err) {
    console.error("Error in recommendation engine:", err);
    return { movies: [], topGenre: "Trending" };
  }
}

module.exports = { getRecommendedMovies };
