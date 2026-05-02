const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isAdmin } = require('../middleware');

router.get('/', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const proUsers = await User.countDocuments({ isPro: true });
    res.render('admin/dashboard', { title: 'Admin Dashboard', totalUsers, proUsers });
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

module.exports = router;
