import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

export const employeeDetailsSlice = createSlice({
  name: 'fetchedEmployees',
  initialState,
  reducers: {
    fetchedEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { fetchedEmployees } = employeeDetailsSlice.actions;

export default employeeDetailsSlice.reducer;