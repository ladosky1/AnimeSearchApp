import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    animeId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    year: {
        type: String,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    }
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;