import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import budgetReducer from './slices/budgetSlice';
import transactionReducer from './slices/transactionSlice';
import securityReducer from './slices/securitySlice';
import chatReducer from './slices/chatSlice';

/** Redux store configuration combining all feature slices. */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    transactions: transactionReducer,
    security: securityReducer,
    chat: chatReducer,
  },
});
