require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require('path');
const MONGO_URL = 'mongodb://127.0.0.1:27017/ai-moviela';
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const movieRoutes = require('./routes/show');
const ejsmate = require("ejs-mate");
const router = express.Router();
const pageRoutes = require('./routes/pages');
const exploreroutes = require('./routes/explore');
const trendingroutes = require('./routes/trending')
const axios = require('axios');

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsmate);

app.use(session({
  secret: 'wishlistsecret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());


// Middleware 
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});



passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false, { message: 'Incorrect username' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return done(null, false, { message: 'Incorrect password' });

  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

main().then(() => {
  console.log("✅ Connected to DB");
})
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.use('/', authRoutes);
const indexRoutes = require("./routes/index");
const adminRoutes = require('./routes/admin');
app.use("/movie-la", indexRoutes);
app.use("/admin", adminRoutes);
app.use(movieRoutes);
app.use('/', pageRoutes);

app.use('/', exploreroutes);

app.use('/', trendingroutes);



app.listen(port, () => {
  console.log(`🚀 App is  running on port ${port}`);
});