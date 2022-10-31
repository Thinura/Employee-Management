import { Box, Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import { isEmpty, isEqual } from "lodash";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

import { EmployeeForm, Layout } from "../../../components";
import { LIST_EMPLOYEE_BUTTON_TITLE, EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE } from "../../../constants";

import employeesJson from '../../../employees.json';
import { employeeServices } from "../../../services";
export default function EditId() {
    const [employee, setEmployee] = useState({});
    const [isFetching, setIsFetchinf] = useState(true)
    const router = useRouter()

    const { id } = router.query;

    async function fetchEmployeeById(employeeId) {
        const { status, data } = await employeeServices.getEmployeeProfile({ employeeId });
        const employeeData = isEqual(status, 200) ? data : {}
        setEmployee(employeeData)
        setIsFetchinf(false);
    }

    useEffect(() => {
        if (!isEmpty(id) && isFetching) {
            fetchEmployeeById(id)
        }
    }, [id, isFetching])

    async function updateEmployee(data) {
        await employeeServices.updateEmployeeProfile({ employeeId: id, data })
        router.push('/employee/list');
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
            {!isEmpty(employee) && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <EmployeeForm employee={employee} onSubmitHandler={updateEmployee} submitBtnTitle={EDIT_EMPLOYEE_SUBMIT_BUTTON_TITLE} />
                </Box>
            )}
        </Layout>
    )
}
