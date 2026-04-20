import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import animeRoutes from "./routes/animeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
        ];

        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/watchlist", watchlistRoutes);


app.get("/", (req,res) => {
    res.status(200).json({ message: "AnimeLad API running" });
});

app.get("/debug-routes", (req, res) => {
    res.json({
        message: "Server is running",
        routes: ["/api/auth", "/api/anime", "/api/watchlist"],
        cwd: process.cwd(),
        env: process.env.NODE_ENV,
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})