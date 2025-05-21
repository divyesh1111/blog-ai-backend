const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // ✅ Define app BEFORE using it

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // /api/auth/login
app.use('/api', blogRoutes);      // /api/blogs

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
