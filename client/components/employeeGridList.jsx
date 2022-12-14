import { Grid } from "@mui/material";
import { useSelector } from 'react-redux';

import EmployeeCard from "./employeeCard";
import { EMPLOYEE_LIST_EMPTY_MESSAGE } from '../constants';

export default function EmployeeGridList() {
    const employees = useSelector((state)=> state.fetchedEmployees.employees);

    if (!employees || employees.length === 0) return <div>{EMPLOYEE_LIST_EMPTY_MESSAGE}</div>;
    return (
        <Grid container spacing={3} columns={{ lg: 15, md: 12, sm: 9 }}>
            {
                employees.map(employee => (
                    <Grid item key={`employee-${employee.id}`} lg={3} md={3} sm={3}>
                        <EmployeeCard key={`employee-${employee.id}`} employee={employee} />
                    </Grid>
                ))
            }
        </Grid>
    );
}