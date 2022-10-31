import { Box, Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from 'next/router'

import { EmployeeForm, Layout } from "../../components";
import { LIST_EMPLOYEE_BUTTON_TITLE, ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE } from "../../constants";
import { employeeServices } from "../../services";

export default function Add() {
    const router = useRouter()

    async function createEmployee(data) {
        await employeeServices.createEmployeeProfile({data})
        router.push('/employee/list')
    }

    return (
        <Layout>
            <Stack spacing={3} sx={{ justifyContent: 'flex-end', paddingRight: '1em', paddingBottom: '1em' }} direction={"row"}>
                <Link href={"/employee/list"} style={{ color: "#ffffff", textDecoration: 'none' }}>
                    <Button sx={{ backgroundColor: purple[800], color: '#ffffff', borderRadius: 8, }} variant="contained" component="label">
                        {LIST_EMPLOYEE_BUTTON_TITLE}
                    </Button>
                </Link>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <EmployeeForm onSubmitHandler={createEmployee} submitBtnTitle={ADD_EMPLOYEE_SUBMIT_BUTTON_TITLE} />
            </Box>
        </Layout>
    )
}
