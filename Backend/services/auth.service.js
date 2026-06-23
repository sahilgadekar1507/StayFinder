import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id)
    .select("-password");

  return createdUser;
};

export { registerUser };
