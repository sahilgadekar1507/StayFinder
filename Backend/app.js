import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
    res.send("StayFinder API is running!");
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;