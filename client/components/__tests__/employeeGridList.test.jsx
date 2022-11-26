import { render, screen } from '@testing-library/react';
import { EmployeeGridList } from '@/components';
import { EMPLOYEE_LIST_EMPTY_MESSAGE } from '@/constants';

import { mockEmployees } from '../../__mocks__/mockData';

describe('Employee Gird List Component', () => {

    it('should render empty employee message for empty employee array',  () => {
        const emptyEmployees = [];
        render(
            <EmployeeGridList
                employees={emptyEmployees}
            />
        );
        const emptyMessageElement = screen.getByText(EMPLOYEE_LIST_EMPTY_MESSAGE);
        expect(emptyMessageElement).toBeInTheDocument();
    });

    it('should render empty employee message for undefined employee array',  () => {
        const emptyEmployees = undefined;
        render(
            <EmployeeGridList
                employees={emptyEmployees}
            />
        );
        const emptyMessageElement = screen.getByText(EMPLOYEE_LIST_EMPTY_MESSAGE);
        expect(emptyMessageElement).toBeInTheDocument();
    });

    it('should render employee card for employee profile',  () => {
        render(
            <EmployeeGridList
                employees={mockEmployees}
            />
        );
        expect(screen.getByText(`${mockEmployees[0].email}`)).toBeInTheDocument();
    });
});