import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import budgetRouter from "./routes/budgetRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Heath routes
app.get("/", (req, res) => {
    res.send("Server is running");
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter);

// Handle 404 routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;