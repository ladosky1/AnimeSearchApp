import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import animeRoutes from "./routes/animeRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://animelad-v2.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/anime", animeRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "AnimeLad API running"
    });
});

const PORT = process.env.PORT || 5000;

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});