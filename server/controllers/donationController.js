import Donation from '../Models/donationModel.mjs';

// Create a new donation
export const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to submit donation',
      error: error.message,
    });
  }
};

// Get all donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch donations',
      error: error.message,
    });
  }
};
