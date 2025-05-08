const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const Port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
// MongoDB connection
mongoose.connect('mongodb+srv://nagarajanvijay6380:nagarajanvijay...@cluster0.kjmrazm.mongodb.net//loanadmin').then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  totalAmount: Number,
  paidNow: Number,
  willPayNow: Number,
  loanStart: Date,
  loanEnd: Date,
  duration: String,
  paidThisMonth: String
});

const User = mongoose.model('User', userSchema);

// API Routes
// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Add a new user
app.post('/api/users', async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).send('User added');
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send('User updated');
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('User deleted');
});

// Admin Login - Simple check
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});
app.listen(Port, () => console.log(`Server running on port ${Port || 5000}`));
