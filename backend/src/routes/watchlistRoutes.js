import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addToWatchlist, getWatchlist, deleteWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/", protect, addToWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/:animeId", protect, deleteWatchlist);

export default router;

