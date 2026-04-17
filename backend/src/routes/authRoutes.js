import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);

export default router;