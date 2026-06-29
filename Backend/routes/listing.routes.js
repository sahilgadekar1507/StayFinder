import express from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createListing,
  getAllListings,
  getListingById,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/", verifyJWT, createListing);
router.get("/", getAllListings);
router.get("/:listingId", getListingById);

export default router;
