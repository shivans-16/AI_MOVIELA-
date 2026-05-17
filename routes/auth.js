const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Contact = require('../models/contactUs');
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

router.get('/myaccount', async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to view your account');
    return res.redirect('/login');
  }
  
  try {
    const userContacts = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.render('myaccount.ejs', { title: 'Your Account', userContacts });
  } catch (error) {
    console.error('Error fetching user contacts:', error);
    res.render('myaccount.ejs', { title: 'Your Account', userContacts: [] });
  }
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

router.post('/contact', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must be logged in to contact us' });
  }
  
  const { name, email, phone, subject, message } = req.body;

  try {
    await Contact.create({
      fullName: name,
      emailAddress: email,
      phoneNumber: phone,
      subject: subject,
      message: message,
      userId: req.user._id
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;