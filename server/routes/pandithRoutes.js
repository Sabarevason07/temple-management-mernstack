import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getPandithInfo,
  updatePandithProfile,
  getPandithById,
  getPandithPoojas,
  updatePoojaStatus,
} from '../controllers/pandithController.js';

const router = express.Router();

router.post('/get-pandith-info', authMiddleware, getPandithInfo);
router.post('/update-profile', authMiddleware, updatePandithProfile);
router.post('/getPandithById', authMiddleware, getPandithById);
router.get('/pandith-poojas', authMiddleware, getPandithPoojas);
router.post('/updatePoojaStatus', authMiddleware, updatePoojaStatus);

export default router;
