import { Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import { isEqual } from "lodash";
import Link from "next/link";

import { Layout, RenderTable, RenderTableButton } from "../../components";
import { ADD_EMPLOYEE_BUTTON_TITLE } from "../../constants";
import employeeList from '../../employees.json';
import { employeeServices } from "../../services";

export default function List({ employees }) {
    return (
        <Layout>
            <Stack spacing={3} sx={{ justifyContent: 'flex-end', paddingRight: '1em', paddingBottom: '1em' }} direction={"row"}>
                <Link href={"/employee/add"} style={{ color: "#ffffff", textDecoration: 'none' }}>
                    <Button
                        sx={{ backgroundColor: purple[800], color: '#ffffff', borderRadius: 8, }}
                        variant="contained"
                        component="label"
                    >
                        {ADD_EMPLOYEE_BUTTON_TITLE}
                    </Button>
                </Link>
                <RenderTableButton />
            </Stack>
            <RenderTable data={employees} />
        </Layout>
    )
}

export async function getServerSideProps() {

    const { status, data } = await employeeServices.getAllEmployeeProfiles();

    const employees = isEqual(status, 200) ? data : []
    return {
        props: {
            employees
        }
    }
}