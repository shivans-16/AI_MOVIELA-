const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');
const Movie=require("../models/movie");
const axios=require('axios');
const { getRecommendedMovies } = require('../utils/recommendationEngine');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get('/ai-search', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to make ai search');
    return res.redirect('/login');
  }
  res.render('ai-search');
});

// Recommended Movies Page
router.get('/recommended', async (req, res) => {
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



// Add to Wishlist
// router.post('/add-to-wishlist/:id', async (req, res) => {
//   const movieId = req.params.id;

//   // Assuming you have movie data available (from DB or static array)
//   const movie = await getMovieById(movieId); // Replace with actual logic

//   const exists = await Wishlist.findOne({ title: movie.title });
//   if (!exists) {
//     await Wishlist.create({
//       title: movie.title,
//       genre: movie.genre,
//       releaseYear: movie.year,
//       description: movie.description,
//       image: movie.image
//     });
//     req.flash('success', 'Added to your wishlist');
//   } else {
//     req.flash('success', 'Already in your wishlist');
//   }

//   res.redirect('/moodboards');
// });



// Add to Wishlist
router.post('/add-to-wishlist/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId); // ✅ This replaces getMovieById

    if (!movie) {
      req.flash('error', 'Movie not found');
      return res.redirect('/explore');
    }

    const exists = await Wishlist.findOne({ title: movie.title });
    if (!exists) {
      await Wishlist.create({
        title: movie.title,
        genre: movie.genre,
        releaseYear: movie.releaseYear,
        description: movie.description,
        image: movie.image
      });
      req.flash('success', 'Added to your wishlist');
    } else {
      req.flash('success', 'Already in your wishlist');
    }

    res.redirect('/moodboards');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/explore');
  }
});

// Moodboards Page
router.get('/moodboards', async (req, res) => {
  const wishlist = await Wishlist.find({});
  res.render('moodboards', { wishlist });
});

// Delete Wishlist

router.post('/wishlist/remove/:id',async(req,res)=>{
  const mid=req.params.id;
  try{
    await Wishlist.findByIdAndDelete(mid);
    req.flash('success','Removed from the Wishlists !!');
    res.redirect('/moodboards');
  }
  catch(err)
  {
    console.error(err);
    req.flash('error','Could not be removed !!');
    res.redirect("/moodboards");
  }
});

// ai-results


// router.post('/ai-results', async (req, res) => {
  
//   const { genre, yearMin, yearMax } = req.body;

// const query = {};
// if (genre && genre !== 'Genre') query.genre = genre;
// if (yearMin && yearMax) {
//   query.year = { $gte: Number(yearMin), $lte: Number(yearMax) };
// }

//   try {
//     const movies = await Movie.find(query);
//     res.render('ai-results', { movies });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching recommendations');
//   }
// });


// router.post('/ai-results', async (req, res) => {
//   const { query, genre, yearMin, yearMax } = req.body;
//   let dbResults = [];
//   let externalResults = [];

//   try {
//     const conditions = [];

//     // 🔍 Natural language query
//     if (query && query.trim() !== "") {
//       const q = query.toLowerCase();
//       conditions.push({
//         $or: [
//           { title: { $regex: q, $options: "i" } },
//           { genre: { $regex: q, $options: "i" } },
//           { description: { $regex: q, $options: "i" } }
//         ]
//       });
//     }

//     // 🎯 Genre filter
//     if (genre && genre !== "Genre (optional)") {
//       conditions.push({ genre });
//     }

//     // 📅 Year range filter
//     if (yearMin && yearMax) {
//       conditions.push({ year: { $gte: Number(yearMin), $lte: Number(yearMax) } });
//     }

//     // ✅ Smart query: combine with $and
//     if (conditions.length > 0) {
//       dbResults = await Movie.find({ $and: conditions });
//     }

//     // 🌐 External API fallback
//     if (dbResults.length === 0 && query) {
//       const axios = require('axios');
//       const apiRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&s=${query}`);
//       if (apiRes.data.Search) {
//         externalResults = apiRes.data.Search.map(m => ({
//           title: m.Title,
//           year: m.Year,
//           genre: "Unknown",
//           image: m.Poster,
//           description: "Fetched from OMDb",
//           source: "external"
//         }));
//       }
//     }

//     res.render('ai-results', { movies: [...dbResults, ...externalResults] });
//   } catch (err) {
//     console.error("Search error:", err);
//     res.status(500).send("Error fetching recommendations");
//   }
// });

/*

router.post('/ai-results', async (req, res) => {
  const { query, genre, yearMin, yearMax } = req.body;
  let dbResults = [];
  let externalResults = [];

  try {
    const conditions = [];

    // 🔍 Natural language query
    if (query && query.trim() !== "") {
      const q = query.toLowerCase();
      conditions.push({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { genre: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } }
        ]
      });
    }

    // 🎯 Genre filter
    if (genre && genre !== "Genre (optional)") {
      conditions.push({ genre });
    }

    // 📅 Year range filter
    if (yearMin && yearMax) {
      conditions.push({ year: { $gte: Number(yearMin), $lte: Number(yearMax) } });
    }

    // ✅ Combine filters
    if (conditions.length > 0) {
      dbResults = await Movie.find({ $and: conditions });
    }

    // 🌐 External API fallback
    if (dbResults.length === 0 && query) {
      try {
        // First try general search
        const apiRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&s=${encodeURIComponent(query)}`);
        if (apiRes.data.Search) {
          externalResults = apiRes.data.Search.map(m => ({
            title: m.Title,
            year: m.Year,
            genre: "Unknown",
            image: m.Poster !== "N/A" ? m.Poster : "/images/default.jpg",
            description: "Fetched from OMDb",
            source: "external"
          }));
        } else {
          // Try exact title match
          const exactRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&t=${encodeURIComponent(query)}`);
          if (exactRes.data && exactRes.data.Title) {
            externalResults.push({
              title: exactRes.data.Title,
              year: exactRes.data.Year,
              genre: exactRes.data.Genre || "Unknown",
              image: exactRes.data.Poster !== "N/A" ? exactRes.data.Poster : "/images/default.jpg",
              description: exactRes.data.Plot || "Fetched from OMDb",
              source: "external"
            });
          }
        }
      } catch (apiErr) {
        console.error("OMDb API error:", apiErr.message);
      }
    }

    // 🖼️ Render results
    res.render('ai-results', { movies: [...dbResults, ...externalResults] });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).send("Error fetching recommendations");
  }
});


*/
/*


const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie'); // Adjust path if needed
*/

// 🧠 Natural Language Extractor
function extractFiltersFromQuery(query) {
  const genreList = [
    "action", "romance", "horror", "sci-fi", "comedy", "biography",
    "thriller", "adventure", "drama", "animation"
  ];

  const lowerQuery = query.toLowerCase();

  // 🎯 Genre detection
  const detectedGenre = genreList.find(g => lowerQuery.includes(g));

  // 📅 Year detection
  const yearMatches = lowerQuery.match(/\b(19|20)\d{2}s?\b/g);
  let yearMin = null;
  let yearMax = null;

  if (yearMatches && yearMatches.length > 0) {
    const cleanYears = yearMatches.map(y => parseInt(y.replace("s", "")));
    const minYear = Math.min(...cleanYears);
    const maxYear = Math.max(...cleanYears);
    yearMin = minYear;
    yearMax = maxYear + 9;
  }

  // 🔍 Cleaned keyword query for OMDb
  const keywordQuery = lowerQuery
    .replace(/[^a-z0-9\s]/gi, '')
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 5)
    .join(' ');

  return { detectedGenre, yearMin, yearMax, keywordQuery };
}

// 🚀 AI Results Route
router.post('/ai-results', async (req, res) => {
  const { query, genre, yearMin, yearMax } = req.body;
  let dbResults = [];
  let externalResults = [];

  try {
    const conditions = [];

    // 🧠 Extract filters from natural query
    const extracted = extractFiltersFromQuery(query || "");
    const autoGenre = genre && genre !== "Genre (optional)" ? genre : extracted.detectedGenre;
    const autoYearMin = yearMin || extracted.yearMin;
    const autoYearMax = yearMax || extracted.yearMax;
    const keywordQuery = extracted.keywordQuery;

    // 🔍 Natural language DB search
    if (query && query.trim() !== "") {
      const q = query.toLowerCase();
      conditions.push({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { genre: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } }
        ]
      });
    }

    // 🎯 Genre filter
    if (autoGenre) {
      conditions.push({ genre: new RegExp(autoGenre, "i") });
    }

    // 📅 Year range filter
    if (autoYearMin && autoYearMax) {
      conditions.push({ year: { $gte: Number(autoYearMin), $lte: Number(autoYearMax) } });
    }

    // ✅ DB query
    if (conditions.length > 0) {
      dbResults = await Movie.find({ $and: conditions });
    }

    // 🌐 OMDb fallback if no DB results
    if (dbResults.length === 0 && keywordQuery) {
      try {
        const apiRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&s=${encodeURIComponent(keywordQuery)}`);
        if (apiRes.data.Search) {
          externalResults = apiRes.data.Search.map(m => ({
            title: m.Title,
            year: m.Year,
            genre: "Unknown",
            image: m.Poster !== "N/A" ? m.Poster : "/images/default.jpg",
            description: "Fetched from OMDb",
            source: "external"
          }));
        } else {
          const exactRes = await axios.get(`https://www.omdbapi.com/?apikey=a72e8af8&t=${encodeURIComponent(keywordQuery)}`);
          if (exactRes.data && exactRes.data.Title) {
            externalResults.push({
              title: exactRes.data.Title,
              year: exactRes.data.Year,
              genre: exactRes.data.Genre || "Unknown",
              image: exactRes.data.Poster !== "N/A" ? exactRes.data.Poster : "/images/default.jpg",
              description: exactRes.data.Plot || "Fetched from OMDb",
              source: "external"
            });
          }
        }
      } catch (apiErr) {
        console.error("OMDb API error:", apiErr.message);
      }
    }

    // 🖼️ Render results
    res.render('ai-results', { movies: [...dbResults, ...externalResults] });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).send("Error fetching recommendations");
  }
});


// Upgrade to Pro Page
router.get('/upgrade', (req, res) => {
  res.render('upgrade');
});

// Payment Page [NEW]
router.get('/payment', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to access payment');
    return res.redirect('/login');
  }
  res.render('payment');
});

// Create Razorpay Order API
router.post('/api/create-order', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const options = {
    amount: 89900, // 899.00 INR (in paise)
    currency: "INR",
    receipt: "receipt_" + req.user._id,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// Verify Razorpay Payment API
router.post('/api/verify-payment', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    // Payment is verified
    try {
      // Update User status in DB
      const User = require('../models/user');
      await User.findByIdAndUpdate(req.user._id, { isPro: true }); // Assuming isPro field exists or you'll add it
      
      console.log('Payment Verified for user:', req.user.username);
      res.json({ success: true, message: "Payment verified successfully" });
    } catch (err) {
      console.error("Database Update Error:", err);
      res.status(500).json({ success: false, message: "Verification failed at DB level" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;