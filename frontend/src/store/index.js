import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import budgetReducer from './slices/budgetSlice';
import transactionReducer from './slices/transactionSlice';
import securityReducer from './slices/securitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    transactions: transactionReducer,
    security: securityReducer,
  },
});
