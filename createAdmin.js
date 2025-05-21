// server/createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const existingUser = await User.findOne({ username: 'admin' });

    if (existingUser) {
      console.log('⚠️ Admin user already exists');
      mongoose.disconnect();
      return;
    }

    const user = new User({
      username: 'admin',
      password: 'admin123', // This will be hashed in the pre-save hook
    });

    await user.save();
    console.log('✅ Admin user created successfully!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });
