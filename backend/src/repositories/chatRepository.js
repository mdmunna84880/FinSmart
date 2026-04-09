import { Transaction } from "../models/Transaction.js";
import { Budget } from "../models/Budget.js";

/** Compute monthly income and expense averages from transaction history. */
const getMonthlyAverages = (transactions) => {
    const monthlyData = {};
    for (const transaction of transactions) {
        const monthKey = new Date(transaction.date).toISOString().slice(0, 7);
        if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0 };
        if (transaction.type === "Income") monthlyData[monthKey].income += transaction.amount;
        else monthlyData[monthKey].expense += transaction.amount;
    }
    return monthlyData;
};

/** Compute spending breakdown by expense category. */
const getCategoryBreakdown = (transactions) => {
    const categories = {};
    const expenseTransactions = transactions.filter((t) => t.type === "Expense");
    for (const transaction of expenseTransactions) {
        categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    }
    return Object.entries(categories)
        .sort(([, a], [, b]) => b - a)
        .map(([category, amount]) => ({ category, amount }));
};

/** Aggregate 12-month financial context for the authenticated user. */
export const aggregateUserFinancialData = async (user) => {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

    const [transactions, budgets] = await Promise.all([
        Transaction.find({
            userId: user._id,
            date: { $gte: twelveMonthsAgo }
        }).sort({ date: -1 }).lean(),
        Budget.find({
            userId: user._id,
            $or: Array.from({ length: 12 }).map((_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - index, 1);
                return { year: date.getFullYear(), month: date.getMonth() + 1 };
            })
        }).lean()
    ]);

    const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        user: { name: user.name, createdAt: user.createdAt },
        summary: {
            totalIncome,
            totalExpense,
            netSavings: totalIncome - totalExpense,
            transactionCount: transactions.length,
            averages: {
                monthlyIncome: totalIncome / 12,
                monthlyExpense: totalExpense / 12,
            }
        },
        monthlyTrends: getMonthlyAverages(transactions),
        topCategories: getCategoryBreakdown(transactions),
        activeBudgets: budgets.map((budget) => ({
            period: `${budget.year}-${String(budget.month).padStart(2, '0')}`,
            limit: budget.monthlyBudget,
            savingsTarget: budget.savingsTarget,
            categoryLimits: budget.categoryLimits
        })),
        recentTransactions: transactions.slice(0, 20).map((t) => ({
            date: new Date(t.date).toISOString().slice(0, 10),
            amount: t.amount,
            type: t.type,
            category: t.category,
            desc: t.desc || ""
        }))
    };
};
