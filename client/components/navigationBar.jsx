import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";

export default function NavigationBar() {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'left', textAlign: 'left', backgroundColor: purple[800] }}>
                <Typography variant={'h5'} sx={{ minWidth: 100, paddingBlock: 1, paddingLeft: 2 }} color={'#ffffff'}>Employee Manager</Typography>
            </Box>
        </React.Fragment>
    )
}