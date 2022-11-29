import { Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import axios from 'axios';
import Link from "next/link";
import https from 'https';

import { Layout, RenderTable, RenderTableButton } from "../../components";
import { ADD_EMPLOYEE_BUTTON_TITLE } from "../../constants";
import { wrapper } from '../../slices/store';
import { fetchedEmployees } from '../../slices/employeeDetailsSlice';

export default function List() {
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
            <RenderTable />
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    // added because SSL is self assigned 
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    let data = [];
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee`, { httpsAgent });
        data = response.data;
    }catch(error){
        console.error(error)
    }
    store.dispatch(fetchedEmployees(data));
})