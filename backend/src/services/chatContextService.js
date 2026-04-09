import { Transaction } from "../models/Transaction.js";
import { Budget } from "../models/Budget.js";

// Compute start date for last 12 months window
const getOneYearAgo = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    d.setHours(0, 0, 0, 0);
    return d;
};

// Group transactions by month label (e.g. "2024-03")
const groupByMonth = (transactions) => {
    const map = {};
    for (const t of transactions) {
        const key = new Date(t.date).toISOString().slice(0, 7);
        if (!map[key]) map[key] = { income: 0, expense: 0 };
        if (t.type === "Income") map[key].income += t.amount;
        else map[key].expense += t.amount;
    }
    return map;
};

// Aggregate category totals for expense transactions
const groupByCategory = (transactions) => {
    const map = {};
    for (const t of transactions) {
        if (t.type !== "Expense") continue;
        map[t.category] = (map[t.category] || 0) + t.amount;
    }
    return Object.entries(map)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount);
};

/**
 * Build full financial context for the authenticated user
 * covering the last 12 months of transactions and budgets.
 */
export const buildFinancialContext = async (user) => {
    const since = getOneYearAgo();

    // Fetch all relevant documents in parallel
    const [transactions, budgets] = await Promise.all([
        Transaction.find({ userId: user._id, date: { $gte: since } })
            .sort({ date: -1 })
            .lean(),
        Budget.find({
            userId: user._id,
            $or: buildMonthFilter(),
        }).lean(),
    ]);

    const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((s, t) => s + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((s, t) => s + t.amount, 0);

    return {
        user: { name: user.name, memberSince: user.createdAt },
        dataWindow: "Last 12 months",
        summary: {
            totalIncome,
            totalExpense,
            netSavings: totalIncome - totalExpense,
            transactionCount: transactions.length,
        },
        monthlyBreakdown: groupByMonth(transactions),
        topExpenseCategories: groupByCategory(transactions),
        budgets: budgets.map((b) => ({
            month: `${b.year}-${String(b.month).padStart(2, "0")}`,
            monthlyBudget: b.monthlyBudget,
            savingsTarget: b.savingsTarget,
            categoryLimits: b.categoryLimits,
        })),
        // Recent 20 transactions for granular context
        recentTransactions: transactions.slice(0, 20).map((t) => ({
            amount: t.amount,
            type: t.type,
            category: t.category,
            date: new Date(t.date).toISOString().slice(0, 10),
            desc: t.desc || "",
        })),
    };
};

// Build OR filter for last 12 month/year pairs
const buildMonthFilter = () => {
    const pairs = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        pairs.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
    }
    return pairs;
};
