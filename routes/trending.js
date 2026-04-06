const express = require('express');
const router = express.Router();

router.get('/trending', (req, res) => {
  res.render('trending', {
    topWatched: [
    {title: 'Spider-Man: Homecoming', releaseYear: 2017, image: 'https://tse2.mm.bing.net/th/id/OIP.ztjFBG7xvkj3aYUQrS4zzAHaLH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },  
   { title: 'Iron Man', releaseYear: 2008, image: 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/movie/l73VFJXXxf94H8qmN7LZoL3ePIIlDX.jpg' },
   { title: 'Black Panther', releaseYear: 2022, image: 'https://tse2.mm.bing.net/th/id/OIP.Gjl7G72zrhphlGMihw1BigHaKL?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
   { title: 'Dr Strange', releaseYear: 2019, image: 'https://m.media-amazon.com/images/I/A12-NFRep6L.jpg' },
   { title: 'Avengers-Endgame', releaseYear: 2014, image: 'https://image.tmdb.org/t/p/original/z0gRHPKq0uX2YY5YqKRLiRCoBqN.jpg' },
   { title: 'Avengers-Infinity War', releaseYear: 2017, image: 'https://image.tmdb.org/t/p/original/pf8DZqVdlx69JX3803Ml0ag0sNk.jpg' },  
   { title: 'Captain America', releaseYear: 2011, image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/captain-america-the-first-avenger-2011-movie-poster.jpg' },
   { title: 'Spiderman:No Way Home', releaseYear: 2022, image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6508d53d-9f08-4740-a8a1-d26e4506f78a/detgxql-fdd62a85-790b-4c7d-9fc0-4a10b2c2e994.jpg/v1/fill/w_1280,h_1811,q_75,strp/spider_man__no_way_home_poster_by_marvelmango_detgxql-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMSIsInBhdGgiOiJcL2ZcLzY1MDhkNTNkLTlmMDgtNDc0MC1hOGExLWQyNmU0NTA2Zjc4YVwvZGV0Z3hxbC1mZGQ2MmE4NS03OTBiLTRjN2QtOWZjMC00YTEwYjJjMmU5OTQuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.maNMIRaeL8L8bVj39SQWfQfcla8NtwKOAN4oh6zh0Eg' }
    ],
    latest: [
        {
    title: "The Irishman",
    releaseYear: 2019,
    image: "https://tse3.mm.bing.net/th/id/OIP.WN80MKTw7BiATjd_fdoMWwHaFm?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    title: "Casino",
    releaseYear: 1995,
    image: "https://tse4.mm.bing.net/th/id/OIP.3tfgo2godC0Milz_9n66aAHaF8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    title: "Gangs of Wasseypur",
    releaseYear: 2012,
    image: "https://flxt.tmsimg.com/assets/p9312127_p_v13_aa.jpg"
  },
  {
    title: "Once Upon a Time in America",
    releaseYear: 1984,
    image: "https://tse3.mm.bing.net/th/id/OIP.8MLfuMt4Na_YBQ4CeMMnjAHaLM?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    title: "A Bronx Tale",
    releaseYear: 1993,
    image: "https://ntvb.tmsimg.com/assets/p15044_v_h10_aa.jpg?w=1280&h=720"
  },
  {
    title: "Mean Streets",
    releaseYear: 1973,
    image: "https://movieposter.gr/7171-large_default/mean-streets.jpg"
  },
  {
    title: "American Gangster",
    releaseYear: 2007,
    image: "https://m.media-amazon.com/images/M/MV5BMjFmZGI2YTEtYmJhMS00YTE5LWJjNjAtNDI5OGY5ZDhmNTRlXkEyXkFqcGdeQXVyODAwMTU1MTE@._V1_FMjpg_UX1000_.jpg"
  },

    ],
    upcoming: [
        {
    title: "Gangs of Wasseypur",
    releaseYear: 2012,
    image: "https://flxt.tmsimg.com/assets/p9312127_p_v13_aa.jpg"
  },
  {
    title: "Once Upon a Time in America",
    releaseYear: 1984,
    image: "https://tse3.mm.bing.net/th/id/OIP.8MLfuMt4Na_YBQ4CeMMnjAHaLM?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    title: "A Bronx Tale",
    releaseYear: 1993,
    image: "https://ntvb.tmsimg.com/assets/p15044_v_h10_aa.jpg?w=1280&h=720"
  },
  {
    title: "Mean Streets",
    releaseYear: 1973,
    image: "https://movieposter.gr/7171-large_default/mean-streets.jpg"
  },
    ],
    recent: [
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
    ]
  });
});


module.exports = router;