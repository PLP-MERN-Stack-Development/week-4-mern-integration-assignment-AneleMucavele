require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

const passport = require('./middleware/auth');
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Blog API is running');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});