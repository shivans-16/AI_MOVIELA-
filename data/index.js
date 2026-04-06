const mongoose = require('mongoose');
const Movie = require('../models/movie');

// Sample data (replace with full 100+ later)
const movies = [
    /*
  {
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    image: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  {
    title: "The Notebook",
    genre: "Romance",
    year: 2004,
    image: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8QOe7Dgj3n6eT5k9.jpg"
  },
  {
    title: "Get Out",
    genre: "Horror",
    year: 2017,
    image: "https://image.tmdb.org/t/p/w500/1SwAVYpuLj8KsHxllTF8to9zv3M.jpg"
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "Inside Out",
    genre: "Animation",
    year: 2015,
    image: "https://image.tmdb.org/t/p/w500/aAmfIX3TT40zUHGcCKrlOZRKC7u.jpg"
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },
  {
    title: "Avengers: Endgame",
    genre: "Action",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
  },
  {
    title: "Finding Nemo",
    genre: "Animation",
    year: 2003,
    image: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg"
  },
  {
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
  },
  {
    title: "Coco",
    genre: "Animation",
    year: 2017,
    image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
  },
  {
    title: "Joker",
    genre: "Crime",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  }
    */


  {
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },

  {
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },

  {
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
  },
  {
    title: "Avengers: Endgame",
    genre: "Action",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    title: "Finding Nemo",
    genre: "Animation",
    year: 2003,
    image: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg"
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    title: "Coco",
    genre: "Animation",
    year: 2017,
    image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
  },
  {
    title: "Joker",
    genre: "Crime",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    title: "The Lion King",
    genre: "Animation",
    year: 1994,
    image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg"
  },
  {
    title: "Black Panther",
    genre: "Action",
    year: 2018,
    image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
  },
  {
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    title: "Toy Story",
    genre: "Animation",
    year: 1995,
    image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
  },
  {
    title: "Shutter Island",
    genre: "Thriller",
    year: 2010,
    image: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg"
  },

  {
    title: "Gladiator",
    genre: "Action",
    year: 2000,
    image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
  },

  {
    title: "The Avengers",
    genre: "Action",
    year: 2012,
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
  },
  {
    title: "The Silence of the Lambs",
    genre: "Thriller",
    year: 1991,
    image: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg"
  },
  {
    title: "Up",
    genre: "Animation",
    year: 2009,
    image: "https://image.tmdb.org/t/p/w500/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg"
  },
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },

  {
    title: "The Social Network",
    genre: "Drama",
    year: 2010,
    image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg"
  },
  {
    title: "Iron Man",
    genre: "Action",
    year: 2008,
    image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
  },
  {
    title: "Deadpool",
    genre: "Comedy",
    year: 2016,
    image: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg"
  },

  {
    title: "Zootopia",
    genre: "Animation",
    year: 2016,
    image: "https://image.tmdb.org/t/p/w500/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg"
  },
  {
    title: "The Wolf of Wall Street",
    genre: "Biography",
    year: 2013,
    image: "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg"
  },
  {
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    image: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg"
  },

  {
    title: "La La Land",
    genre: "Romance",
    year: 2016,
    image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
  },
  {
    title: "Frozen II",
    genre: "Animation",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg"
  },
  {
    title: "Spider-Man: No Way Home",
    genre: "Action",
    year: 2021,
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    year: 2014,
    image:"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/46B8A83BA06607A61A95ED9B9409F9BE155C43FA9841A4D10BE4B49E8150DFA4/scale?width=1200&aspectRatio=1.78&format=jpeg"
    // image: "https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg"
  }
  // ... continue until 100

];



mongoose.connect('mongodb://127.0.0.1:27017/ai-moviela', {
  useNewUrlParser: true,
//   useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  await Movie.deleteMany({});
//   console.log("🧹 Cleared old movies");

  await Movie.insertMany(movies);
  console.log(`🌱 Seeded ${movies.length} movies`);

  mongoose.connection.close();
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});