import { createSlice } from '@reduxjs/toolkit';
import { includes } from 'lodash';
import { TABLE_RENDER_TYPES } from '../constants';

const initialState = {
  selection: TABLE_RENDER_TYPES.GRID,
}

export const tableSelectionSlice = createSlice({
  name: 'tableSelection',
  initialState,
  reducers: {
    selectTable: (state, action) => {
        if(includes(TABLE_RENDER_TYPES, action.payload)){
            state.selection = action.payload
        }
    },
  },
})

export const { selectTable } = tableSelectionSlice.actions

export default tableSelectionSlice.reducer