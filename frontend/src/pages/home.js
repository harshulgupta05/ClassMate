import React from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

import { Divider as MuiDivider, Button, Paper, Card as MuiCard, CardContent, CardActions, Grid, Typography } from "@mui/material"
import styled from "styled-components/macro";

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreateIcon from '@mui/icons-material/Create';

const Wrapper = styled(Paper)`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #233044!important;
`;

const Card = styled(MuiCard)`
    padding: 20px;
    width: 350px;
    height: 250px;
    margin: auto;
`;

function Home() {
    const [location, setLocation] = useLocation();
    const login = () => setLocation("/login");
    const signup = () => setLocation("/signup");

    const pageTitle = "Home";

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardContent>
                        <Typography component="h3" variant="h4" color="primary" align="center" gutterBottom>
                            Welcome to ClassMate!
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs />
                            <Grid item xs={5}>
                                <Button size="medium" variant="contained" style={{ width: 120 }} startIcon={<FingerprintIcon />} onClick={login}>LOGIN</Button>
                            </Grid>
                            <Grid item xs />
                            <Grid item xs={5}>
                                <Button size="medium" variant="contained" style={{ width: 120 }} startIcon={<CreateIcon />} onClick={signup}>SIGN UP</Button>
                            </Grid>
                            <Grid item xs />
                        </Grid>
                    </CardActions>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default Home;