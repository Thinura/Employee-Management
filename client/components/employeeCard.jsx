import {
    Box,
    Stack,
    IconButton,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from '@mui/material';

import { red, lightGreen } from '@mui/material/colors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFullName, getGender } from '../utils/employeeCard';
import { useRouter } from 'next/router'
import { employeeServices } from '../services';


export default function EmployeeCard({ employee }) {
    const router = useRouter()

    async function deleteEmployeeProfile(employeeId) {
        await employeeServices.deleteEmployeeProfile({ employeeId });
        // To refetch the data from getServerSideProps
        router.replace(router.asPath);
    }

    return (
        <Card key={`employee-card-${employee.id}`}>
            <Box sx={{ display: "flex", justifyContent: 'center' }}>
                <Box >
                    <CardMedia
                        component="img"
                        height={180}
                        src={employee.photo}
                        alt={getFullName(employee.firstName, employee.lastName)}
                    />
                </Box>

            </Box>
            <Stack direction={'row'} display='flex'>
                <CardContent sx={{ width: 1 }}>
                    <Box>
                        <Typography noWrap variant="body1" display="block" gutterbottomcolor="text.primary">
                            {getFullName(employee.firstName, employee.lastName)}
                        </Typography>
                    </Box>
                    <Box >
                        <Typography noWrap
                            variant="body1" gutterbottomcolor="text.primary">
                            {employee.email}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1 }}>
                        <Typography noWrap variant="body1" display="block" gutterbottomcolor="text.primary">
                            {employee.phone}
                        </Typography>
                    </Box>
                    <Box direction={'row'} display='flex' sx={{ width: 1, justifyContent: 'space-between' }}>
                        <Typography variant="body1" display="block" gutterbottomcolor="text.primary">
                            {getGender(employee.gender)}
                        </Typography>
                        <CardActions sx={{ width: 'max-content', justifyContent: 'space-between' }}>
                            <Box>
                                <IconButton onClick={() => { deleteEmployeeProfile(employee.id) }} size='small' sx={{ bgcolor: red[500] }} variant="rounded">
                                    <DeleteIcon sx={{ color: '#ffffff' }} />
                                </IconButton>
                            </Box>
                            <Box>
                                <IconButton onClick={() => { router.push(`/employee/edit/${employee.id}`) }} size='small' sx={{ bgcolor: lightGreen[500] }} variant="rounded">
                                    <ManageAccountsIcon sx={{ color: '#ffffff' }} />
                                </IconButton>
                            </Box>
                        </CardActions>
                    </Box>
                </CardContent>
            </Stack>
        </Card>
    );
}