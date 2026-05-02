module.exports.isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.isAdmin) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect('/movie-la');
  }
  next();
};
