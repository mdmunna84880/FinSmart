import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Fetch paginated transactions from the server based on active filters
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/transactions', { params });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Fetch available years, months, categories, and types for filter dropdowns
export const fetchAvailableFilters = createAsyncThunk(
  'transactions/fetchFilters',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/transactions/filters', { params });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Create a new transaction record
export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/transactions', transactionData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Update an existing transaction record by ID
export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async ({ id, data: transactionData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/transactions/${id}`, transactionData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Remove a transaction record from the database by ID
export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Default state for the transaction slice
const initialState = {
  transactions: [],
  pagination: null,
  availableFilters: { years: [], months: [], categories: [], types: [] },
  isLoading: false,
  isMutating: false,
  isError: false,
  message: '',
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Clear error state when user dismisses notification
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all transactions lifecycle
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Failed to load transactions';
      })
      // Populate filter dropdowns once available options are fetched
      .addCase(fetchAvailableFilters.fulfilled, (state, action) => {
        state.availableFilters = action.payload;
      })
      // Add transaction lifecycle
      .addCase(addTransaction.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isMutating = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(addTransaction.rejected, (state) => {
        state.isMutating = false;
      })
      // Update transaction lifecycle
      .addCase(updateTransaction.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isMutating = false;
        const index = state.transactions.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.isMutating = false;
      })
      // Delete transaction lifecycle
      .addCase(deleteTransaction.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isMutating = false;
        state.transactions = state.transactions.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

// Export reducer actions for use in components
export const { clearError } = transactionSlice.actions;

export default transactionSlice.reducer;
