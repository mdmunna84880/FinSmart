const CATEGORY_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#0ea5e9', '#f97316', '#14b8a6'];

// Generate 6-month cash flow data from recent transaction history
export function computeCashFlow(transactions = []) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const sortKey = date.getFullYear() * 100 + date.getMonth();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!map[key]) map[key] = { month, income: 0, expenses: 0, sortKey };
    if (t.type === 'Income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });

  return Object.values(map)
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(-6)
    .map(({ month, income, expenses }) => ({ month, income, expenses }));
}

// Group spending by category for visualization in donut charts
export function computeCategorySpending(transactions = []) {
  const map = {};

  transactions
    .filter((t) => t.type === 'Expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map).map(([name, value], i) => ({
    name,
    value,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));
}
