import {    getAnimeCategories, 
            searchAnimeService,
            previewAnimeService,
            detailAnimeService } from "../services/animeService.js";

export async function searchAnime(req, res) {
    try {
        const { q } = req.query;

        if(!q) {
            return res.status(400).json({ message: "search query is required" });
        }

        const data = await searchAnimeService(q);

        res.json(data);          
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch anime" });
    }
}

export async function previewAnime(req, res){
    try {
        const { q } = req.query;

        if(!q) {
            return res.status(400).json({ message: "search query is required" });
        }

        const data = await previewAnimeService(q);

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No anime found" });
    }
}

export async function detailAnime(req, res){
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "anime id is required" });
        }

        const data = await detailAnimeService(id);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch anime details" });
    }
}

export async function getCategories(req, res){
    try {
        const data = await getAnimeCategories();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
}