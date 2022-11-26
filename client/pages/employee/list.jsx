import { Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import axios from 'axios';
import { isEqual } from "lodash";
import Link from "next/link";
import https from 'https';
import { Layout, RenderTable, RenderTableButton } from "../../components";
import { ADD_EMPLOYEE_BUTTON_TITLE } from "../../constants";

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
    );
}

export async function getServerSideProps() {
    // added because SSL is self assigned 
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    let data = [];
    let status = 404;
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee`, { httpsAgent });
        data = response.data;
        status = response.status;
    }catch(error){
        console.error(error)
    }
    const employees = isEqual(status, 200) ? data : [];
    return {
        props: {
            employees
        }
    };
}