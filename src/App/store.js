import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/User/userSlice';

export const store = configureStore({
  reducer: {
      user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Adjust this based on your needs
    }),
});
