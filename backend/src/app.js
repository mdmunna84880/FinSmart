import express from "express";
import cors from "cors";
import morgan from "morgan";

import AppError from "./utils/AppError.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Heath routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Handle 404 routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;