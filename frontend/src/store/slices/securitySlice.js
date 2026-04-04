import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Change password thunk
export const changePassword = createAsyncThunk(
  'security/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/users/change-password', passwordData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to change password' });
    }
  }
);

const initialState = {
  isLoading: false,
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    resetSecurityStatus: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetSecurityStatus } = securitySlice.actions;
export default securitySlice.reducer;
