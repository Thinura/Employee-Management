import { Grid } from "@mui/material"
import EmployeeCard from "./employeeCard";

export default function EmployeeGridList({ employees }) {
    if (!employees || employees.length === 0) return <div>No Employees Available</div>
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
    )
}