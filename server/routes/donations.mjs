// routes/donations.mjs
import express from 'express';
import Layout from "../components/Layout";


const router = express.Router();

router.post('/donations', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).send(donation);
  } catch (error) {
    res.status(400).send({ message: 'Failed to submit donation', error });
  }
});


export default router;
