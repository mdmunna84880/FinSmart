export const authenticatedUserProfile = {
  userAccountId: "mdmunna84880",
  userFullName: "Md Munna",
  userEmailAddress: "mdmunna19434@gmail.com",
  userAvatarInitials: "MM",
};

export const userMonthlyFinancialSummary = {
  allocatedMonthlyBudget: 6000.00,
  totalMonthlyIncome: 8450.00,
  totalMonthlyExpenses: 5230.00,
  get calculatedNetSavings() {
    return this.totalMonthlyIncome - this.totalMonthlyExpenses;
  }
};

// We will map over this array for our tables and Recharts visualizations
export const financialTransactionsHistory = [
  {
    transactionId: "txn_001",
    transactionDate: "2024-03-20",
    transactionCategory: "Salary",
    transactionType: "income",
    transactionAmount: 8450.00,
    transactionDescription: "March TechCorp Salary",
  },
  {
    transactionId: "txn_002",
    transactionDate: "2024-03-18",
    transactionCategory: "Housing",
    transactionType: "expense",
    transactionAmount: 2100.00,
    transactionDescription: "April Rent",
  },
  {
    transactionId: "txn_003",
    transactionDate: "2024-03-15",
    transactionCategory: "Food",
    transactionType: "expense",
    transactionAmount: 145.50,
    transactionDescription: "Whole Foods Groceries",
  },
  {
    transactionId: "txn_004",
    transactionDate: "2024-03-12",
    transactionCategory: "Utilities",
    transactionType: "expense",
    transactionAmount: 180.00,
    transactionDescription: "Electric Bill",
  },
  {
    transactionId: "txn_005",
    transactionDate: "2024-03-10",
    transactionCategory: "Transport",
    transactionType: "expense",
    transactionAmount: 45.00,
    transactionDescription: "Uber to Airport",
  },
  {
    transactionId: "txn_006",
    transactionDate: "2024-03-08",
    transactionCategory: "Entertainment",
    transactionType: "expense",
    transactionAmount: 120.00,
    transactionDescription: "Concert Tickets",
  },
  {
    transactionId: "txn_007",
    transactionDate: "2024-03-05",
    transactionCategory: "Food",
    transactionType: "expense",
    transactionAmount: 65.20,
    transactionDescription: "Dinner at Luigi's",
  }
];

// Helper array for the dropdown menu when we build the form to add new transactions
export const availableTransactionCategories = [
  "Housing", 
  "Food", 
  "Transport", 
  "Utilities", 
  "Entertainment", 
  "Healthcare", 
  "Shopping", 
  "Salary", 
  "Investment", 
  "Other"
];

// Six month monthly income and expenses
export const sixMonthCashFlow = [
  { 
    month: 'Oct', 
    income: 4200, 
    expenses: 3100 
  },
  { 
    month: 'Nov', 
    income: 4200, 
    expenses: 3800 
  },
  { 
    month: 'Dec', 
    income: 4800, 
    expenses: 4500
  }, 
  { 
    month: 'Jan', 
    income: 4200, 
    expenses: 2800
  },
  { 
    month: 'Feb', 
    income: 4500, 
    expenses: 3000 
  },
  { 
    month: 'Mar', 
    income: 4500, 
    expenses: 3200 
  },
];