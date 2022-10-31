import { Grid } from "@mui/material";
import Head from "next/head";

import { APPLICATION_META_TILE, APPLICATION_META_TILE_DESC } from '../constants'
import NavigationBar from './navigationBar'
import FooterBar from './footerBar';

export default function Layout({ children, pageTitle = APPLICATION_META_TILE , pageDescription = APPLICATION_META_TILE_DESC }) {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Grid container spacing={2}>
                {/* Navigation Bar */}
                <Grid item xs={12} md={12} lg={12}>
                    <NavigationBar />
                </Grid>
                {/* Content Bar */}
                <Grid item xs={12} md={12} lg={12}>
                    {children}
                </Grid>
                {/* Footer Bar */}
                <Grid item xs={12} md={12} lg={12}>
                    <FooterBar />
                </Grid>
            </Grid>
        </>
    )
}