import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = async (
    username,
    email,
    password
) => {

    const existingUser =
        await User.findOne({
            email
        });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    const user =
        await User.create({
            username,
            email,
            password: hashedPassword
        });

    return user;
};

export { registerUser };