const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      req.flash('error', 'Username already exists');
      return res.redirect('/movie-la');
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });
    req.flash('success', 'User registered successfully');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Signup failed. Try again.');
    res.redirect('/signup');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Invalid Username or Password');
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) return next(err);
      req.flash('success', 'User logged in successfully');
      return res.redirect('/movie-la');
    });
  })(req, res, next);
});

router.get('/myaccount', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to view your account');
    return res.redirect('/login');
  }
  res.render('myaccount.ejs', { title: 'Your Account' });
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully');
    res.redirect('/movie-la');
  });
});

router.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About AI-MovieLA' });
});

router.get('/privacy', (req, res) => {
  res.render('privacy');
});

router.get('/contact', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to view your account');
    return res.redirect('/login');
  }
  res.render('contact.ejs');
});

router.post('/contact', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to contct us');
    return res.redirect('/login');
  }
  const { name, email, message } = req.body;

  req.flash('success', 'We will get in contact with you very soon.');
  res.redirect('/movie-la');
});

module.exports = router;