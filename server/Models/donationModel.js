const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
