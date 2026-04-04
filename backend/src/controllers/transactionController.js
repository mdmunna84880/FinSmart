import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.js";
import AppError from "../utils/AppError.js";
import { buildTransactionMatch } from "../services/transactionQueryService.js";
import { getDynamicFilters } from "../repositories/transactionsRepository.js";

// Create a new transaction record for the authenticated user
export const addTransaction = async (req, res, next) => {
    const { amount, type, category, date, desc } = req.body;

    const transaction = await Transaction.create({
        userId: req.user._id,
        amount, type, category, desc,
        date: date || Date.now(),
    });

    return res.status(201).json({ success: true, message: "Transaction created", data: transaction });
};

// Fetch filtered and paginated transactions from the ledger
export const getTransactions = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    // Build query filters using the search service
    const matchFilters = buildTransactionMatch(req.user._id, req.query);

    // Retrieve transactions and total count in parallel
    const [transactions, totalTransactions] = await Promise.all([
        Transaction.find(matchFilters).sort({ date: -1 }).skip((page - 1) * limit).limit(limit),
        Transaction.countDocuments(matchFilters)
    ]);

    return res.status(200).json({
        success: true,
        data: transactions,
        pagination: { currentPage: page, totalPages: Math.ceil(totalTransactions / limit), totalTransactions, limit }
    });
};

// Retrieve specific transaction details by ID
export const getSingleTransaction = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new AppError("Invalid ID", 400);

    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
    if (!transaction) throw new AppError("Transaction not found", 404);

    return res.status(200).json({ success: true, data: transaction });
};

// Update existing transaction data based on record ID
export const updateTransaction = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new AppError("Invalid ID", 400);

    const transaction = await Transaction.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { ...req.body },
        { new: true, runValidators: true }
    );
    if (!transaction) throw new AppError("Transaction not found", 404);

    return res.status(200).json({ success: true, message: "Transaction updated", data: transaction });
};

// Remove a specific transaction record from the database
export const deleteTransaction = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new AppError("Invalid ID", 400);

    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!transaction) throw new AppError("Transaction not found", 404);

    return res.status(200).json({ success: true, message: "Transaction deleted" });
};

// Retrieve unique years, months, and categories for dynamic filtering
export const getAvailableFilters = async (req, res, next) => {
    const filters = await getDynamicFilters(req.user._id, req.query);

    return res.status(200).json({ success: true, data: filters });
};
