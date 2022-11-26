import { render, screen } from '@testing-library/react';
import { EmployeeCard } from '@/components';
import { getFullName, getGender } from '@/utils/employeeCard';

import { mockEmployees } from '../../__mocks__/mockData';

describe("Employee Card Componenet", () => {
    it("should render the correct email", () => {
        render(
            <EmployeeCard employee={mockEmployees[0]} />
        );
        const { email } = mockEmployees[0];
        const emailElement = screen.getByText(email);
        expect(emailElement).toBeInTheDocument();
    });

    it("should render the correct phone number", () => {
        render(
            <EmployeeCard employee={mockEmployees[0]} />
        );
        const { phone } = mockEmployees[0];
        const phoneElement = screen.getByText(phone);
        expect(phoneElement).toBeInTheDocument();
    });

    it("should render the correct full name", () => {
        render(
            <EmployeeCard employee={mockEmployees[0]} />
        );
        const { firstName, lastName } = mockEmployees[0];
        const fullName = getFullName(firstName, lastName);
        const fullNameElement = screen.getByText(fullName);
        expect(fullNameElement).toBeInTheDocument();
    });

    it("should render the correct gender", () => {
        render(
            <EmployeeCard employee={mockEmployees[0]} />
        );
        const { gender } = mockEmployees[0];
        const formatGender = getGender(gender);
        const genderElement = screen.getByText(formatGender);
        expect(genderElement).toBeInTheDocument();
    });

});