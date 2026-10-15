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


app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`AnimeLad API listening on port ${PORT}`);
});