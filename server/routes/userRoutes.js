import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyPandith,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getAllApprovedPandiths,
  bookingPooja,
  bookingAvailability,
  userPoojas,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register user
router.post("/register", register);

//Login user
router.post("/login", login);

//Get user info (for protected routes)
router.post("/get-user-info", authMiddleware, getUserInfo);

//Apply Pandith (Pandith is now a user so the routes added in user routes)
router.post("/apply-pandith", authMiddleware, applyPandith);

//Mark all notifications as seen
router.post("/mark-all-notifications-as-seen", markAllNotificationsAsSeen);

//Delete all seen notifications
router.post("/delete-all-seen-notifications", deleteAllSeenNotifications);

//Get all approved pandiths
router.get("/getAllApprovedPandiths", getAllApprovedPandiths);

//Book Pooja
router.post("/book-pooja", authMiddleware, bookingPooja);

//Booking availability
router.post("/booking-availability", authMiddleware, bookingAvailability);

//Get poojas
router.get("/user-poojas", authMiddleware, userPoojas);

//export
export default router;
