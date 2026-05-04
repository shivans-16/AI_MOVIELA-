const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Movie = require('../models/movie');
const Wishlist = require('../models/wishlist');
const { isAdmin } = require('../middleware');

router.get('/', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const proUsers = await User.countDocuments({ isPro: true });
    const totalMovies = await Movie.countDocuments({});
    const totalWishlists = await Wishlist.countDocuments({});
    res.render('admin/dashboard', { title: 'Admin Dashboard', totalUsers, proUsers, totalMovies, totalWishlists });
  } catch (err) {
    req.flash('error', 'Failed to load dashboard statistics.');
    res.redirect('/movie-la');
  }
});

router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.render('admin/users', { title: 'Manage Users', users });
  } catch (err) {
    req.flash('error', 'Failed to fetch users.');
    res.redirect('/admin');
  }
});

router.post('/users/:id/delete', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      req.flash('error', 'Cannot delete an administrator.');
      return res.redirect('/admin/users');
    }
    await User.findByIdAndDelete(req.params.id);
    req.flash('success', 'User deleted successfully.');
  } catch (err) {
    req.flash('error', 'Failed to delete user.');
  }
  res.redirect('/admin/users');
});

router.post('/users/:id/toggle-pro', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isPro = !user.isPro;
    await user.save();
    req.flash('success', `User Pro status updated to ${user.isPro}.`);
  } catch (err) {
    req.flash('error', 'Failed to update Pro status.');
  }
  res.redirect('/admin/users');
});

router.post('/users/:id/toggle-admin', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user._id.equals(req.user._id)) {
      req.flash('error', 'You cannot change your own admin status.');
      return res.redirect('/admin/users');
    }
    user.isAdmin = !user.isAdmin;
    await user.save();
    req.flash('success', `User Admin status updated to ${user.isAdmin}.`);
  } catch (err) {
    req.flash('error', 'Failed to update Admin status.');
  }
  res.redirect('/admin/users');
});

router.get('/movies', isAdmin, async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.render('admin/movies', { title: 'Manage Movies', movies });
  } catch (err) {
    req.flash('error', 'Failed to fetch movies.');
    res.redirect('/admin');
  }
});

router.post('/movies/:id/delete', isAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    req.flash('success', 'Movie deleted successfully.');
  } catch (err) {
    req.flash('error', 'Failed to delete movie.');
  }
  res.redirect('/admin/movies');
});

module.exports = router;
