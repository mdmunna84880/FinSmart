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

// Retrieve current authenticated user profile
export const getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password -__v");
    
    if (!user) {
        throw new AppError("User not found", 404);
    }
    
    return res.status(200).json({
        success: true,
        message: "User profile retrieved successfully",
        data: user
    });
};

// Change the authenticated user's password
export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isCurrentPasswordValid = await user.isPasswordCorrect(currentPassword);

    if (!isCurrentPasswordValid) {
        throw new AppError("Current password is incorrect", 401);
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
};

