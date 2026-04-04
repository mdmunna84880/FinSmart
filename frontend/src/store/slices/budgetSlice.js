import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Thunk to fetch budget summary with optional year and month filtering
export const fetchBudgetSummary = createAsyncThunk(
  'budget/fetchSummary',
  async ({ year, month } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/budgets/summary', { params: { year, month } });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Thunk to create or update a budget entry
export const setBudget = createAsyncThunk(
  'budget/set',
  async (budgetData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/budgets', budgetData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occured");
    }
  }
);

// Default state for the budget slice
const initialState = {
  summary: null,
  isLoading: false,
  isMutating: false,
  isError: false,
  message: '',
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    // Clear any lingering error messages when user dismisses them
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBudgetSummary lifecycle
      .addCase(fetchBudgetSummary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBudgetSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchBudgetSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Failed to load budget summary';
      })
      // Handle setBudget lifecycle
      .addCase(setBudget.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(setBudget.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(setBudget.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

// Export the clearError action for use in components
export const { clearError } = budgetSlice.actions;

export default budgetSlice.reducer;
