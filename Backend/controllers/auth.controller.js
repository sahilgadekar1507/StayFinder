import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { registerUser } from "../services/auth.service.js";

import { registerSchema } from "../validators/auth.validator.js";

export const signup = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const { username, email, password } = req.body;

  const user = await registerUser(username, email, password);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});
