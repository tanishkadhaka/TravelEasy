const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/TravelEasyDB'; 
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Subscriber Schema and Model
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// API Endpoint for Subscribing
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required!' });
  }

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to subscribe', error: err.message });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


