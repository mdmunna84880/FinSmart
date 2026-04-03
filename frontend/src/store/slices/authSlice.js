import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import api from '@/utils/api';
import { isAxiosError } from 'axios';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCheckingAuth: true,
  message: '',
};

// Register user thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/register', userData);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Login user thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', userData);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Logout user thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/logout');
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Retrieve the current authenticated user session
export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/me');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
      })
      // Authentication Operation Handlers (Login & Register)
      .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(loginUser.fulfilled, registerUser.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addMatcher(isAnyOf(loginUser.rejected, registerUser.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
        state.user = null;
      });
  },
});

export const { resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
