import express from "express";

import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();


router.get("/test", (req, res) => {
    res.send("Auth route working");
});

router.post("/signup", signup);
router.post("/login", login);

export default router;
