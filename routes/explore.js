const express = require('express');
const router = express.Router();

// const movies = [


//   { title: 'Shazam!', releaseYear: 2019, image: 'https://th.bing.com/th/id/OIP.OBCh4LnguZpKekFoKQVLEAHaLH?w=202&h=303&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3' },
//   { title: 'Spider-Man: Homecoming', releaseYear: 2017, image: 'https://tse2.mm.bing.net/th/id/OIP.ztjFBG7xvkj3aYUQrS4zzAHaLH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },  
//   { title: 'Iron Man', releaseYear: 2008, image: 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/movie/l73VFJXXxf94H8qmN7LZoL3ePIIlDX.jpg' },
//   { title: 'Black Panther', releaseYear: 2022, image: 'https://tse2.mm.bing.net/th/id/OIP.Gjl7G72zrhphlGMihw1BigHaKL?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
//   { title: 'Dr Strange', releaseYear: 2019, image: 'https://m.media-amazon.com/images/I/A12-NFRep6L.jpg' },
//   { title: 'Avengers-Endgame', releaseYear: 2014, image: 'https://image.tmdb.org/t/p/original/z0gRHPKq0uX2YY5YqKRLiRCoBqN.jpg' },
//   { title: 'Avengers-Infinity War', releaseYear: 2017, image: 'https://image.tmdb.org/t/p/original/pf8DZqVdlx69JX3803Ml0ag0sNk.jpg' },  
//   { title: 'Captain America', releaseYear: 2011, image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/captain-america-the-first-avenger-2011-movie-poster.jpg' },
//   { title: 'Spiderman:No Way Home', releaseYear: 2022, image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6508d53d-9f08-4740-a8a1-d26e4506f78a/detgxql-fdd62a85-790b-4c7d-9fc0-4a10b2c2e994.jpg/v1/fill/w_1280,h_1811,q_75,strp/spider_man__no_way_home_poster_by_marvelmango_detgxql-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMSIsInBhdGgiOiJcL2ZcLzY1MDhkNTNkLTlmMDgtNDc0MC1hOGExLWQyNmU0NTA2Zjc4YVwvZGV0Z3hxbC1mZGQ2MmE4NS03OTBiLTRjN2QtOWZjMC00YTEwYjJjMmU5OTQuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.maNMIRaeL8L8bVj39SQWfQfcla8NtwKOAN4oh6zh0Eg' }

// ];

router.get('/explore', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to explore movies');
    return res.redirect('/login');
  }
  res.render('explore.ejs', { 
    superheroes:[
                 { title: 'Shazam!', releaseYear: 2019, image: 'https://th.bing.com/th/id/OIP.OBCh4LnguZpKekFoKQVLEAHaLH?w=202&h=303&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3' },
   { title: 'Spider-Man: Homecoming', releaseYear: 2017, image: 'https://tse2.mm.bing.net/th/id/OIP.ztjFBG7xvkj3aYUQrS4zzAHaLH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },  
   { title: 'Iron Man', releaseYear: 2008, image: 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/movie/l73VFJXXxf94H8qmN7LZoL3ePIIlDX.jpg' },
   { title: 'Black Panther', releaseYear: 2022, image: 'https://tse2.mm.bing.net/th/id/OIP.Gjl7G72zrhphlGMihw1BigHaKL?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
   { title: 'Dr Strange', releaseYear: 2019, image: 'https://m.media-amazon.com/images/I/A12-NFRep6L.jpg' },
   { title: 'Avengers-Endgame', releaseYear: 2014, image: 'https://image.tmdb.org/t/p/original/z0gRHPKq0uX2YY5YqKRLiRCoBqN.jpg' },
   { title: 'Avengers-Infinity War', releaseYear: 2017, image: 'https://image.tmdb.org/t/p/original/pf8DZqVdlx69JX3803Ml0ag0sNk.jpg' },  
   { title: 'Captain America', releaseYear: 2011, image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/captain-america-the-first-avenger-2011-movie-poster.jpg' },
   { title: 'Spiderman:No Way Home', releaseYear: 2022, image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6508d53d-9f08-4740-a8a1-d26e4506f78a/detgxql-fdd62a85-790b-4c7d-9fc0-4a10b2c2e994.jpg/v1/fill/w_1280,h_1811,q_75,strp/spider_man__no_way_home_poster_by_marvelmango_detgxql-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMSIsInBhdGgiOiJcL2ZcLzY1MDhkNTNkLTlmMDgtNDc0MC1hOGExLWQyNmU0NTA2Zjc4YVwvZGV0Z3hxbC1mZGQ2MmE4NS03OTBiLTRjN2QtOWZjMC00YTEwYjJjMmU5OTQuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.maNMIRaeL8L8bVj39SQWfQfcla8NtwKOAN4oh6zh0Eg' }
    ] ,
    mafias:[
      
  {
    title: "The Godfather",
    releaseYear: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
  },
  {
    title: "Goodfellas",
    releaseYear: 1990,
    image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg"
  },
  {
    title: "Scarface",
    releaseYear: 1983,
    image: "https://upload.wikimedia.org/wikipedia/en/7/71/Scarface_-_1983_film.jpg"
  },
  {
    title: "The Godfather Part II",
    releaseYear: 1974,
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg"
  },
  {
    title: "Donnie Brasco",
    releaseYear: 1997,
    image: "https://img.reelgood.com/content/movie/66750186-7173-4e6c-9805-2e784ef41450/poster-780.jpg"
  },
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
  // {
  //   title: "Black Mass",
  //   releaseYear: 2015,
  //   image: "https://upload.wikimedia.org/wikipedia/en/1/1f/Black_Mass_poster.jpg"
  // },
  // {
  //   title: "The Untouchables",
  //   releaseYear: 1987,
  //   image: "https://upload.wikimedia.org/wikipedia/en/8/82/Untouchables_poster.jpg"
  // },
  // {
  //   title: "Public Enemies",
  //   releaseYear: 2009,
  //   image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Public_Enemies_poster.jpg"
  // }
    ],
    romance:[
  {
    title: "La La Land",
    releaseYear: 2016,
    image: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png"
  },
  {
    title: "Me Before You",
    releaseYear: 2016,
    image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Me_Before_You_%28film%29.jpg"
  },
  {
    title: "The Notebook",
    releaseYear: 2004,
    image: "https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg"
  },
  {
    title: "Titanic",
    releaseYear: 1997,
    image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },
  // {
  //   title: "A Walk to Remember",
  //   releaseYear: 2002,
  //   image: "https://upload.wikimedia.org/wikipedia/en/e/e7/A_Walk_to_Remember_poster.jpg"
  // },
  // {
  //   title: "Call Me by Your Name",
  //   releaseYear: 2017,
  //   image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Call_Me_by_Your_Name_poster.png"
  // },
  {
    title: "Pride & Prejudice",
    releaseYear: 2005,
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/Prideandprejudiceposter.jpg"
  },
  // {
  //   title: "The Fault in Our Stars",
  //   releaseYear: 2014,
  //   image: "https://upload.wikimedia.org/wikipedia/en/6/6f/The_Fault_in_Our_Stars_poster.jpg"
  // },
  {
    title: "Tamasha",
    releaseYear: 2015,
    image: "https://i.mdel.net/i/db/2020/12/1433400/1433400-800w.jpg"
  },
  {
    title: "Jab We Met",
    releaseYear: 2007,
    image: "https://i.ytimg.com/vi/ffda14Scp0s/maxresdefault.jpg"
  },
  // {
  //   title: "Barfi!",
  //   releaseYear: 2012,
  //   image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Barfi_poster.jpg"
  // },
  {
    title: "Rockstar",
    releaseYear: 2011,
    image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ujbsLMrUKtlPdjBdXtGqrjEhD3r.jpg"
  }
    ],
    bollywood:[
  {
    title: "3 Idiots",
    releaseYear: 2009,
    image: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg"
  },
  {
    title: "Zindagi Na Milegi Dobara",
    releaseYear: 2011,
    image: "https://m.media-amazon.com/images/S/pv-target-images/926a63e0690585b02e1482daab89ffcf74f777bef0a0a16177ff4f384468e9da.jpg"
  },
  {
    title: "Dilwale Dulhania Le Jayenge",
    releaseYear: 1995,
    image: "https://i.ytimg.com/vi/nk2r_hlML0Q/maxresdefault.jpg"
  },
  {
    title: "PK",
    releaseYear: 2014,
    image: "https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg"
  },
  {
    title: "Lagaan",
    releaseYear: 2001,
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Lagaan.jpg"
  },
  {
    title: "Swades",
    releaseYear: 2004,
    image: "https://i.ytimg.com/vi/YJ3MSlgtZ1M/maxresdefault.jpg"
  },
  {
    title: "Taare Zameen Par",
    releaseYear: 2007,
    image: "https://i.ytimg.com/vi/KX6xaWY99wQ/maxresdefault.jpg"
  },
  {
    title: "Dangal",
    releaseYear: 2016,
    image: "https://i.ytimg.com/vi/x_7YlGv9u1g/maxresdefault.jpg"
  },
  // {
  //   title: "Queen",
  //   releaseYear: 2014,
  //   image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Queen_movie_poster.jpg"
  // },
  // {
  //   title: "Gully Boy",
  //   releaseYear: 2019,
  //   image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Gully_Boy_poster.jpg"
  // },
  // {
  //   title: "Andhadhun",
  //   releaseYear: 2018,
  //   image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Andhadhun_poster.jpg"
  // },
  // {
  //   title: "Article 15",
  //   releaseYear: 2019,
  //   image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Article_15_poster.jpg"
  // },
  {
    title: "Shershaah",
    releaseYear: 2021,
    image: "https://wallpaperaccess.com/full/6852819.jpg"
  },
  // {
  //   title: "Drishyam",
  //   releaseYear: 2015,
  //   image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Drishyam_Hindi_poster.jpg"
  // },
  // {
  //   title: "Kahaani",
  //   releaseYear: 2012,
  //   image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Kahaani_poster.jpg"
  // },
  // {
  //   title: "Barfi!",
  //   releaseYear: 2012,
  //   image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Barfi_poster.jpg"
  // },
  // {
  //   title: "Tamasha",
  //   releaseYear: 2015,
  //   image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Tamasha_%282015_film%29_poster.jpg"
  // },
  // {
  //   title: "Jab Tak Hai Jaan",
  //   releaseYear: 2012,
  //   image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Jab_Tak_Hai_Jaan_poster.jpg"
  // },
  // {
  //   title: "Ae Dil Hai Mushkil",
  //   releaseYear: 2016,
  //   image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Ae_Dil_Hai_Mushkil_poster.jpg"
  // },
  // {
  //   title: "Yeh Jawaani Hai Deewani",
  //   releaseYear: 2013,
  //   image: "https://upload.wikimedia.org/wikipedia/en/1/1e/Yeh_Jawaani_Hai_Deewani_poster.jpg"
  // }

    ]

  });
});

module.exports = router;