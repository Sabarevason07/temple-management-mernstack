const express = require('express');
const router = express.Router();
const Dharshan = require('../models/Dharshan');

// GET route for fetching Dharshan data
router.get('/dharshan', async (req, res) => {
    try {
        const dharshans = await Dharshan.find();
        res.json(dharshans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST route for creating a new Dharshan
router.get('/donations', async (req, res) => {
    try {
      const donations = await Donation.find(); // Query your MongoDB collection
      res.status(200).json(donations); // Respond with JSON data
    } catch (err) {
      console.error('Error fetching donations:', err);
      res.status(500).json({ message: 'Failed to fetch donations' });
    }
  });

module.exports = router;
