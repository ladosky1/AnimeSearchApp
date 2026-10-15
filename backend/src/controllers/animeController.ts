import type { Request, Response } from "express";

import {
    getAnimeDiscoveryService,
    getAnimeByGenre,
    searchAnimeService,
    previewAnimeService,
    detailAnimeService
} from "../services/animeService.js";

import AppError from "../errors/AppError.js";


export async function getAnimeDiscovery(
    req: Request,
    res: Response
) {
    const {
        trendingPage = "1",
        popularPage = "1",
        airingPage = "1",
        topRatedPage = "1",
        perPage = "10"
    } = req.query;

    const data = await getAnimeDiscoveryService(
        Number(trendingPage),
        Number(popularPage),
        Number(airingPage),
        Number(topRatedPage),
        Number(perPage)
    );

    res.json(data);
}


export async function getGenreAnime(
    req: Request,
    res: Response
) {
    const { genre } = req.params;

    if (!genre || Array.isArray(genre)) {
        throw new AppError("Genre is required", 400);
    }

    const {
        page = "1",
        perPage = "20"
    } = req.query;

    const data = await getAnimeByGenre(
        genre,
        Number(page),
        Number(perPage)
    );

    res.json(data);
}


export async function searchAnime(
    req: Request,
    res: Response
) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        throw new AppError("Search query is required", 400);
    }

    const {
        page = "1",
        perPage = "20"
    } = req.query;

    const data = await searchAnimeService(
        q,
        Number(page),
        Number(perPage)
    );

    res.json(data);
}


export async function previewAnime(
    req: Request,
    res: Response
) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        throw new AppError("Search query is required", 400);
    }

    const data = await previewAnimeService(q);

    res.json(data);
}


export async function detailAnime(
    req: Request,
    res: Response
) {
    const { id } = req.params;

    if (!id) {
        throw new AppError("Anime ID is required", 400);
    }

    const data = await detailAnimeService(Number(id));

    res.json(data);
}