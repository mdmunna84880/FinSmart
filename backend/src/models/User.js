import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    // Hash password with salt
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRY,
        }
    );
};

export const User = model("User", userSchema);
