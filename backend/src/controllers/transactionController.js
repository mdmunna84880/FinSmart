import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.js";
import AppError from "../utils/AppError.js";

// Add a new transaction
export const addTransaction = async (req, res, next) => {
    const { amount, type, category, date, desc } = req.body;

    const transaction = await Transaction.create({
        userId: req.user._id,
        amount,
        type,
        category,
        date: date || Date.now(),
        desc
    });

    return res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: transaction
    });
};

// Get all transactions with filtering and pagination
export const getTransactions = async (req, res, next) => {
    // Pagination defaults
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    // Build the filter
    const matchFilters = { userId: req.user._id };

    if (req.query.type) {
        matchFilters.type = req.query.type;
    }

    if (req.query.category) {
        matchFilters.category = req.query.category;
    }

    if (req.query.month) {
        const currentYear = req.query.year ? parseInt(req.query.year, 10) : new Date().getFullYear();
        const monthNum = parseInt(req.query.month, 10);

        // Start date and end date of the given month
        const startDate = new Date(currentYear, monthNum - 1, 1);
        const endDate = new Date(currentYear, monthNum, 1);

        matchFilters.date = {
            $gte: startDate,
            $lt: endDate
        };
    }

    // Get transactions based on the filter or defalt
    const transactions = await Transaction.find(matchFilters)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

    // Get total documents
    const totalTransactions = await Transaction.countDocuments(matchFilters);

    return res.status(200).json({
        success: true,
        data: transactions,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalTransactions / limit),
            totalTransactions,
            limit
        }
    });
};

// Get single transaction details
export const getSingleTransaction = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid transaction ID", 400);
    }

    const transaction = await Transaction.findOne({
        _id: id,
        userId: req.user._id
    });

    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }

    return res.status(200).json({
        success: true,
        data: transaction
    });
};

// Update an existing transaction
export const updateTransaction = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid transaction ID", 400);
    }

    const transaction = await Transaction.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { ...req.body },
        { new: true, runValidators: true }
    );

    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }

    return res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        data: transaction
    });
};

// Delete a specific transaction
export const deleteTransaction = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid transaction ID", 400);
    }

    const transaction = await Transaction.findOneAndDelete({
        _id: id,
        userId: req.user._id
    });

    if (!transaction) {
        throw new AppError("Transaction not found", 404);
    }

    return res.status(200).json({
        success: true,
        message: "Transaction deleted successfully"
    });
};
