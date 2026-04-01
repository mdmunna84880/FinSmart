import env from "../config/env.js";
import { User } from "../models/User.js";
import AppError from "../utils/AppError.js";

const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict"
};

// Register route for user
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new AppError("User with this email already exists", 409);
    }
    const user = await User.create({
        name,
        email,
        password
    });
    const token = user.generateAccessToken();

    const createdUser = await User.findById(user._id).select("-password -__v");

    return res
        .status(201)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "User registered successfully",
            data: createdUser
        });
};

// Login route for the user
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select("-password -__v");

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            data: loggedInUser
        });
};

// Log out route for the user
export const logoutUser = async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("token", cookieOptions)
        .json({
            success: true,
            message: "User logged out successfully"
        });
};
