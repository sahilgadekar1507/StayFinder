import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACCESS_TOKEN_COOKIE } from "../constants/auth.constants.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[ACCESS_TOKEN_COOKIE];

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select("-password -__v");

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;

  next();
});

export {verifyJWT};