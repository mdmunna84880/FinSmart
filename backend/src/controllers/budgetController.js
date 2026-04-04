import { Budget } from "../models/Budget.js";
import { Transaction } from "../models/Transaction.js";
import AppError from "../utils/AppError.js";

// Set or update the budget for a given month and year
export const setBudget = async (req, res, next) => {
    const { year, month, monthlyBudget, savingsTarget, categoryLimits } = req.body;

    // Use findOneAndUpdate with upsert to create or update
    const budget = await Budget.findOneAndUpdate(
        { userId: req.user._id, year, month },
        {
            $set: {
                monthlyBudget,
                savingsTarget: savingsTarget || 0,
                categoryLimits: categoryLimits || []
            }
        },
        { returnDocument: 'after', upsert: true, runValidators: true }
    );

    return res.status(200).json({
        success: true,
        message: "Budget set successfully",
        data: budget
    });
};

// Retrieve individual budget settings directly
export const getBudget = async (req, res, next) => {
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;

    const budget = await Budget.findOne({ userId: req.user._id, year, month });

    if (!budget) {
        throw new AppError("Budget not found for this month", 404);
    }

    return res.status(200).json({
        success: true,
        data: budget
    });
};

// Retrieve a comprehensive summary including total income, total expense, savings, and categorized budget limits vs spending
export const getBudgetSummary = async (req, res, next) => {
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;

    // Start date and end date for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Fetch the user's budget settings for this specific month
    const budget = await Budget.findOne({ userId: req.user._id, year, month });

    // Default budget values if they haven't set one yet
    const monthlyLimit = budget ? budget.monthlyBudget : 0;
    const savingsTargetValue = budget ? budget.savingsTarget : 0;
    const configuredCategories = budget && budget.categoryLimits ? budget.categoryLimits : [];

    // Aggregate transactions to calculate Total Income, Total Expenses, and Expenses grouped by Category
    const aggregationPipeline = [
        {
            $match: {
                userId: req.user._id,
                date: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: { type: "$type", category: "$category" },
                totalAmount: { $sum: "$amount" }
            }
        }
    ];

    const aggregatedResults = await Transaction.aggregate(aggregationPipeline);

    let totalIncome = 0;
    let totalExpense = 0;
    const expensesByCategory = {};

    // Calculate the totalIncome, total expense and expenses grouped by category
    for (const result of aggregatedResults) {
        if (result._id.type === "Income") {
            totalIncome += result.totalAmount;
        } else if (result._id.type === "Expense") {
            totalExpense += result.totalAmount;
            expensesByCategory[result._id.category] = result.totalAmount;
        }
    }

    // Build the category budgets array mapping limits with actual spending
    const categoryBudgets = configuredCategories.map((catLimit, index) => {
        return {
            id: `budg_${index + 1}`,
            category: catLimit.category,
            limit: catLimit.limit,
            spent: expensesByCategory[catLimit.category] || 0
        };
    });

    const netSavings = totalIncome - totalExpense;

    return res.status(200).json({
        success: true,
        data: {
            year,
            month,
            totalIncome,
            totalExpense,
            netSavings,
            monthlyBudget: monthlyLimit,
            savingsTarget: savingsTargetValue,
            categoryBudgets
        }
    });
};
