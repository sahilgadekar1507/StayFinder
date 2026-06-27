import { asyncHandler } from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ACCESS_TOKEN_COOKIE } from "../constants/auth.constants.js";

import { registerUser, loginUser } from "../services/auth.service.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const signup = asyncHandler(async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { username, email, password } = req.body;

  const user = await registerUser(username, email, password);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { email, password } = req.body;

    const { user, accessToken } = await loginUser(
        email,
        password
    );

    return res
        .status(200)
        .cookie(
            ACCESS_TOKEN_COOKIE,
            accessToken,
            cookieOptions
        )
        .json(
            new ApiResponse(
                200,
                {
                    user
                },
                "Login successful"
            )
        );
});
