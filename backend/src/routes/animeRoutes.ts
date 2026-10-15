import express from "express";

import {
    getAnimeDiscovery,
    getGenreAnime,
    searchAnime,
    previewAnime,
    detailAnime
} from "../controllers/animeController.js";

const router = express.Router();

router.get("/discovery", getAnimeDiscovery);

router.get("/genres/:genre", getGenreAnime);

router.get("/search", searchAnime);

router.get("/preview", previewAnime);

router.get("/:id", detailAnime);

export default router;