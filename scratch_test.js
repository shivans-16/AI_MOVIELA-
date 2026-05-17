const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/ai-moviela').then(async () => {
    const users = await User.find({}, 'username email isAdmin');
    console.log(users);
    process.exit(0);
}).catch(console.error);
