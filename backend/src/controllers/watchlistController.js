import Watchlist from "../models/watchlist.js";

export async function addToWatchlist(req, res){

    try {
        const {animeId, title, image, year} = req.body;

        if(!animeId || !title){
            return res.status(400).json({message: "animeId and title is required!" });
        }

        const existing = await Watchlist.findOne({
            user: req.user._id,
            animeId
        })

        if(existing){
            return res.status(400).json({ message: "This anime is on your watchlist!!" })
        }

        const item = await Watchlist.create({
            user: req.user._id,
            animeId,
            title,
            image,
            year
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: "Failed to add to watchist" });
    }
}

export async function getWatchlist(req, res){
    try {
        const list = await Watchlist.find({ user: req.user._id }).sort({ addedAt: -1});

        res.json(list);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch watchlist" });
    }
}

export async function deleteWatchlist(req,res){
    try {
        const {animeId} = req.params;
        
        const deleted = await Watchlist.findOneAndDelete({
            user: req.user._id,
            animeId
        })

        if(!deleted){
            res.status(404).json({ message: "Anime is not in watchlist" })
        }

        res.json({ message: "Anime deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "failed to remove from watchlist" })
    }
}