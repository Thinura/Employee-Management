import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    IconButton,
    Box,
    CardMedia,
    Button,
} from '@mui/material';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';

import { getFullName, getGender } from '../utils/employeeCard';
import { employeeServices } from '../services';

export default function EmployeeTableList() {
    const employees = useSelector((state)=> state.fetchedEmployees.employees);

    return (
        <TableContainer sx={{ paddingInline: '50px' }}>
            <Table aria-label={'Employee Table'}>
                <TableHead>
                    <TableRow
                        key={'employee-table-header'}
                        sx={{ 'th': { border: '3px solid green' } }}
                    >
                        <TableCell><b>Image</b></TableCell>
                        <TableCell align="left"><b>First Name</b></TableCell>
                        <TableCell align="left"><b>Last Name</b></TableCell>
                        <TableCell align="left"><b>Email</b></TableCell>
                        <TableCell align="left"><b>Phone</b></TableCell>
                        <TableCell align="center"><b>Gender</b></TableCell>
                        <TableCell align="center"><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow
                            key={`employee-table-body-employee-${employee.id}`}
                            sx={{ 'td, th': { border: '1px solid green' } }}
                        >
                            <TableCell width={180} component="th" scope="row">
                                <CardMedia
                                    component="img"
                                    height={130}
                                    width={180}
                                    image={employee.photo}
                                    alt={getFullName(employee.firstName, employee.lastName)}
                                />
                            </TableCell>
                            <TableCell align="left">{employee.firstName}</TableCell>
                            <TableCell className='min-w-[170px]' align="left">{employee.lastName}</TableCell>
                            <TableCell align="left">{employee.email}</TableCell>
                            <TableCell align="left">{employee.phone}</TableCell>
                            <TableCell width={100} align="center">{getGender(employee.gender)}</TableCell>
                            <TableCell width={110} align="center"><TableRowAction employeeId={employee.id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function TableRowAction({ employeeId }) {
    const router = useRouter();
    async function deleteEmployeeProfile(empId) {
        await employeeServices.deleteEmployeeProfile({ employeeId: empId });
        // To refetch the data from getServerSideProps
        router.replace(router.asPath);
    }

    return (
        <Box minWidth={110} sx={{ justifyContent: 'space-between' }} direction={'row'} display='flex'>
            <Box>
                <Link href={`/employee/edit/${employeeId}`} style={{ color: "#ffffff", textDecoration: 'none' }}>
                    <Button size='small' sx={{ bgcolor: grey[800] }} variant="contained">
                        Edit
                    </Button>
                </Link>
            </Box>
            <Box>
                <IconButton onClick={() => { deleteEmployeeProfile(employeeId) }} size='small' sx={{ bgcolor: red[500] }} variant="rounded">
                    <DeleteIcon sx={{ color: '#ffffff' }} />
                </IconButton>
            </Box>
        </Box>
    )
}