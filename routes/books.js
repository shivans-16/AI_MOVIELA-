const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    let rawQuery = req.query.q || 'hindi sahitya';
    let query = rawQuery.toLowerCase();

    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&has_fulltext=true&limit=30`;

    try {
        const response = await axios.get(apiUrl);
        let books = response.data.docs || [];


        books = books.filter(book => book.cover_i);


        books = books.slice(0, 6);

        res.render('books', { books, searchQuery: rawQuery });
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.render('books', { books: [], searchQuery: rawQuery });
    }
});

module.exports = router;
