import express from "express";

import { signup, login, logout, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
