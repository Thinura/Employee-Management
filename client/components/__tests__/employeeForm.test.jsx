import { render, screen } from '@testing-library/react';
import { EmployeeForm } from '@/components';
import { ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE, EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE } from '@/constants';

import { mockEmployees } from '../../__mocks__/mockData';

describe('Employee Form Component', () => {
    const onSubmitHandler = jest.fn();
    it('should render correct email of editing employee profile',async () => {
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                employee={mockEmployees[0]}
                submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const { email } = mockEmployees[0];
        const emailElement = await screen.findByDisplayValue(email);
        expect(emailElement).toBeInTheDocument();
    });

    it('should render correct first name of editing employee profile',async () => {
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                employee={mockEmployees[0]}
                submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const { firstName } = mockEmployees[0];
        const firstNameElement = await screen.findByDisplayValue(firstName);
        expect(firstNameElement).toBeInTheDocument();
    });

    it('should render correct last name of editing employee profile',async () => {
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                employee={mockEmployees[0]}
                submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const { lastName } = mockEmployees[0];
        const lastNameElement = await screen.findByDisplayValue(lastName);
        expect(lastNameElement).toBeInTheDocument();
    });

    it('should render correct phone of editing employee profile',async () => {
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                employee={mockEmployees[0]}
                submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const { phone } = mockEmployees[0];
        const phoneElement = await screen.findByDisplayValue(phone);
        expect(phoneElement).toBeInTheDocument();
    });

    it('should render correct button text if editing employee profile', ()=>{
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                employee={mockEmployees[0]}
                submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const buttonText = screen.getByText(EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE);
        expect(buttonText).toBeInTheDocument();
    });

    it('should render correct button text if adding employee profile', ()=>{
        render(
            <EmployeeForm
                onSubmitHandler={onSubmitHandler}
                submitBtnTitle={ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE}
            />
        );
        const buttonText = screen.getByText(ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE);
        expect(buttonText).toBeInTheDocument();
    });
});