import { configureStore } from '@reduxjs/toolkit'
import tableSelectionReducer from './slices/tableSelectionSlice';

export const store = configureStore({
  reducer: {
    tableSelection: tableSelectionReducer
  },
})