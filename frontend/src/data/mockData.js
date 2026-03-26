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
  // MARCH
  {
    transactionId: "txn_030",
    transactionDate: "2024-03-28",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 4200.00,
    transactionDescription: "TechCorp Salary",
  },
  {
    transactionId: "txn_029",
    transactionDate: "2024-03-25",
    transactionCategory: "Shopping",
    transactionType: "credit",
    transactionAmount: 85.50,
    transactionDescription: "Amazon Refund",
  },
  {
    transactionId: "txn_028",
    transactionDate: "2024-03-22",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 18.25,
    transactionDescription: "Sweetgreen",
  },
  {
    transactionId: "txn_027",
    transactionDate: "2024-03-20",
    transactionCategory: "Entertainment",
    transactionType: "debit",
    transactionAmount: 14.99,
    transactionDescription: "Netflix Subscription",
  },
  {
    transactionId: "txn_026",
    transactionDate: "2024-03-18",
    transactionCategory: "Transportation",
    transactionType: "debit",
    transactionAmount: 45.00,
    transactionDescription: "Shell Gas Station",
  },
  {
    transactionId: "txn_025",
    transactionDate: "2024-03-15",
    transactionCategory: "Housing",
    transactionType: "debit",
    transactionAmount: 2100.00,
    transactionDescription: "April Rent",
  },
  {
    transactionId: "txn_024",
    transactionDate: "2024-03-12",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 850.00,
    transactionDescription: "Upwork Freelance Transfer",
  },
  {
    transactionId: "txn_023",
    transactionDate: "2024-03-10",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 145.50,
    transactionDescription: "Whole Foods Market",
  },
  {
    transactionId: "txn_022",
    transactionDate: "2024-03-08",
    transactionCategory: "Shopping",
    transactionType: "debit",
    transactionAmount: 120.00,
    transactionDescription: "Nike Store",
  },
  {
    transactionId: "txn_021",
    transactionDate: "2024-03-05",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 65.20,
    transactionDescription: "Dinner at Luigi's",
  },

  // FEBRUARY
  {
    transactionId: "txn_020",
    transactionDate: "2024-02-28",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 4200.00,
    transactionDescription: "TechCorp Salary",
  },
  {
    transactionId: "txn_019",
    transactionDate: "2024-02-26",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 45.00,
    transactionDescription: "Venmo - Dinner Split",
  },
  {
    transactionId: "txn_018",
    transactionDate: "2024-02-24",
    transactionCategory: "Entertainment",
    transactionType: "debit",
    transactionAmount: 35.00,
    transactionDescription: "AMC Theaters",
  },
  {
    transactionId: "txn_017",
    transactionDate: "2024-02-21",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 8.50,
    transactionDescription: "Starbucks",
  },
  {
    transactionId: "txn_016",
    transactionDate: "2024-02-20",
    transactionCategory: "Entertainment",
    transactionType: "debit",
    transactionAmount: 14.99,
    transactionDescription: "Netflix Subscription",
  },
  {
    transactionId: "txn_015",
    transactionDate: "2024-02-18",
    transactionCategory: "Transportation",
    transactionType: "debit",
    transactionAmount: 32.50,
    transactionDescription: "Uber",
  },
  {
    transactionId: "txn_014",
    transactionDate: "2024-02-15",
    transactionCategory: "Housing",
    transactionType: "debit",
    transactionAmount: 2100.00,
    transactionDescription: "March Rent",
  },
  {
    transactionId: "txn_013",
    transactionDate: "2024-02-12",
    transactionCategory: "Shopping",
    transactionType: "debit",
    transactionAmount: 210.00,
    transactionDescription: "Apple Store",
  },
  {
    transactionId: "txn_012",
    transactionDate: "2024-02-08",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 185.00,
    transactionDescription: "Trader Joe's",
  },
  {
    transactionId: "txn_011",
    transactionDate: "2024-02-02",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 120.00,
    transactionDescription: "Chase Cashback Reward",
  },

  // JANUARY
  {
    transactionId: "txn_010",
    transactionDate: "2024-01-28",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 4200.00,
    transactionDescription: "TechCorp Salary",
  },
  {
    transactionId: "txn_009",
    transactionDate: "2024-01-25",
    transactionCategory: "Housing",
    transactionType: "debit",
    transactionAmount: 150.00,
    transactionDescription: "Electric Bill",
  },
  {
    transactionId: "txn_008",
    transactionDate: "2024-01-22",
    transactionCategory: "Transportation",
    transactionType: "debit",
    transactionAmount: 60.00,
    transactionDescription: "Monthly Metro Pass",
  },
  {
    transactionId: "txn_007",
    transactionDate: "2024-01-20",
    transactionCategory: "Entertainment",
    transactionType: "debit",
    transactionAmount: 14.99,
    transactionDescription: "Netflix Subscription",
  },
  {
    transactionId: "txn_006",
    transactionDate: "2024-01-18",
    transactionCategory: "Income",
    transactionType: "credit",
    transactionAmount: 1500.00,
    transactionDescription: "Tax Refund",
  },
  {
    transactionId: "txn_005",
    transactionDate: "2024-01-15",
    transactionCategory: "Housing",
    transactionType: "debit",
    transactionAmount: 2100.00,
    transactionDescription: "February Rent",
  },
  {
    transactionId: "txn_004",
    transactionDate: "2024-01-10",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 210.00,
    transactionDescription: "Costco Wholesale",
  },
  {
    transactionId: "txn_003",
    transactionDate: "2024-01-08",
    transactionCategory: "Shopping",
    transactionType: "debit",
    transactionAmount: 45.00,
    transactionDescription: "Target",
  },
  {
    transactionId: "txn_002",
    transactionDate: "2024-01-05",
    transactionCategory: "Food",
    transactionType: "debit",
    transactionAmount: 25.50,
    transactionDescription: "Chipotle",
  },
  {
    transactionId: "txn_001",
    transactionDate: "2024-01-02",
    transactionCategory: "Entertainment",
    transactionType: "debit",
    transactionAmount: 60.00,
    transactionDescription: "Steam Games",
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