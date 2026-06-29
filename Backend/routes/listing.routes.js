import express from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post(
    "/",
    verifyJWT,
    createListing
);

export default router;