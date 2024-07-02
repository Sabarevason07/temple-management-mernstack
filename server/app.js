import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import pandithRoutes from "./routes/pandithRoutes.js";
import bodyParser from 'body-parser';
import { sendConfirmationEmail } from './email.js'; // Import your email function

// DOTENV CONFIGURATION
dotenv.config();

// DATABASE CONFIGURATION
connectDB();

// REST OBJ
const app = express();

app.use(bodyParser.json());

//******** MIDDLEWARE *******/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//***** MIDDLEWARE ROUTES *****/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/pandith", pandithRoutes);

// Handle donation submission and send confirmation email
app.post('/api/v1/auth/donations', async (req, res) => {
  try {
    console.log('Received donation data:', req.body);
    
    // Handle donation submission logic here
    // Example: Save donation to database

    // Send confirmation email
    await sendConfirmationEmail(req.body.email);

    res.status(200).json({ message: 'Donation submitted successfully' });
  } catch (error) {
    console.error('Error submitting donation:', error);
    res.status(500).json({ error: 'Failed to submit donation or send confirmation email.' });
  }
});

//******** PORTS AND LISTEN *******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`.bgBrightMagenta.white);
});
