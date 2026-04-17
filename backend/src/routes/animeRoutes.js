import express from "express";
import { searchAnime, previewAnime, detailAnime, getCategories } from "../controllers/animeController.js";

const router = express.Router();

router.get("/search", searchAnime);
router.get("/preview", previewAnime);
router.get("/categories", getCategories);
router.get("/:id", detailAnime);

export default router;