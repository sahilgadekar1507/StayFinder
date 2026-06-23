import express from "express";

import { signup } from "../controllers/auth.controller.js";

const router = express.Router();


router.get("/test", (req, res) => {
    res.send("Auth route working");
});
router.post("/signup", signup);

export default router;
