import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import tableSelectionReducer from './tableSelectionSlice';
import employeeDetailsReducer from './employeeDetailsSlice';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducer = combineReducers({
  fetchedEmployees: employeeDetailsReducer,
  tableSelection: tableSelectionReducer,
});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            fetchedEmployees: {
              employees: action.payload.fetchedEmployees.employees
            },
            tableSelection: {
              selection: state.tableSelection.selection,
            },
        }
        return nextState;
    } else {
    return combinedReducer(state, action)
  }
}

const makeStore = () =>
  configureStore({
    middleware: composeWithDevTools(applyMiddleware(logger)),
    reducer: masterReducer,
  });


export const wrapper = createWrapper(makeStore);