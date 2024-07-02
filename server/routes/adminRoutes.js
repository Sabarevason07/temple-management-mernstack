import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUser,
  getAllPandith,
  changeAccountStatus,
} from "../controllers/adminController.js";

//Router Obj
const router = express.Router();

//Get all user
router.get("/getAllUser", authMiddleware, getAllUser);

//Get all Pandiths
router.get("/getAllPandiths", authMiddleware, getAllPandith);

//Account Status Change
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus);

//Export
export default router;
