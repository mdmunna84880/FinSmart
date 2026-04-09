import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError.js";
import env from "./config/env.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import budgetRouter from "./routes/budgetRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

const app = express();

/** Application middleware setup for request processing. */
app.use(cors({
    origin: env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/** Health check endpoint for server status. */
app.get("/", (req, res) => {
    res.send("Server is running");
});

/** API route registration for all feature modules. */
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/chat", chatRouter);

/** Handle undefined routes with 404 response. */
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/** Global error handling middleware. */
app.use(globalErrorHandler);

export default app;