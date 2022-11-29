import { render, screen } from '@testing-library/react';
import { EmployeeGridList } from '@/components';
import { EMPLOYEE_LIST_EMPTY_MESSAGE } from '@/constants';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { mockEmployees } from '../../__mocks__/mockData';

const middlewares = []
const mockStore = configureStore(middlewares)

describe('Employee Gird List Component', () => {
    it('should render empty employee message for empty employee array', () => {
        const emptyEmployees = [];
        const initStore = {
            fetchedEmployees: {
                employees: emptyEmployees,
            }
        };
        const store = mockStore(initStore)
        render(
            <Provider store={store}>
                <EmployeeGridList />
            </Provider>
        );
        const emptyMessageElement = screen.getByText(EMPLOYEE_LIST_EMPTY_MESSAGE);
        expect(emptyMessageElement).toBeInTheDocument();
    });

    it('should render empty employee message for undefined employee array', () => {
        const emptyEmployees = undefined;
        const initStore = {
            fetchedEmployees: {
                employees: emptyEmployees,
            }
        };
        const store = mockStore(initStore)
        render(
            <Provider store={store}>
                <EmployeeGridList />
            </Provider>
        );
        const emptyMessageElement = screen.getByText(EMPLOYEE_LIST_EMPTY_MESSAGE);
        expect(emptyMessageElement).toBeInTheDocument();
    });

    it('should render employee card for employee profile', () => {
        const initStore = {
            fetchedEmployees: {
                employees: mockEmployees,
            }
        };
        const store = mockStore(initStore)
        render(
            <Provider store={store}>
                <EmployeeGridList />
            </Provider>
        );
        expect(screen.getByText(`${mockEmployees[0].email}`)).toBeInTheDocument();
    });
});