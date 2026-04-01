import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import env from "../config/env.js";
import AppError from "../utils/AppError.js";

// Verify JWT token from HttpOnly cookie
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new AppError("Unauthorized request: Access token is missing", 401);
        }
        const decodedToken = jwt.verify(
            token,
            env.JWT_SECRET
        );
        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new AppError("Invalid Access Token", 401);
        }
        req.user = user;
        next();
    } catch (error) {
        error.status = 401;
        error.message = error.message === "jwt expired" ? "Token expired, please login again" : "Invalid Access Token";
        next(error);
    }
};
