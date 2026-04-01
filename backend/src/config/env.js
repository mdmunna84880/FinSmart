import dotenv from "dotenv";
dotenv.config();

const env = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
};

export default env;