import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ticketReducer from './slices/ticketSlice';
import officeReducer from './slices/officeSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    offices: officeReducer,
    users: userReducer,
    ui: uiReducer,
  },
});

export default store;
