import React, { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

import { Divider as MuiDivider, Button, Paper, Card as MuiCard, CardHeader, CardContent, CardActions, Grid, TextField as MuiTextField, Typography } from "@mui/material"
import styled from "styled-components/macro";
import { spacing } from "@mui/system";

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
    height: 350px;
    margin: auto;
`;

const TextField = styled(MuiTextField)(spacing);

function SignUp() {
    const [location, setLocation] = useLocation();

    const formValues = {
        userid: '',
        password: '',
        school: '',
    };
    const [formState, setFormState] = useState(formValues);

    const pageTitle = "Sign Up"

    const handleTextChange = (e, target) => {
        setFormState({ ...formState, [target]: e.target.value });
    }

    const register = () => {
        const { userid, password, school } = formState;

        sessionStorage.setItem("user", userid);
        sessionStorage.setItem("school", school);

        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            mode: "cors",
            body: JSON.stringify({
                "number": userid,
                "password": password,
                "school": school
            })
        }).then(response => response.json()).then((data) => {
            if (data.success === true) {
                console.log("successful")
                alert("Sign Up Successful");
                setLocation("/addCourse");
            }
        });
    }

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title="Sign Up for ClassMate!" style={{ textAlign: 'center' }} />
                    <CardContent>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="User ID"
                                    placeholder="######"
                                    inputProps={{ maxLength: 6 }}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleTextChange(e, "userid")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    size="small"
                                    inputProps={{ maxLength: 20 }}
                                    onChange={(e) => handleTextChange(e, "password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="School Name"
                                    placeholder="Lorne Park Secondary School"
                                    fullWidth
                                    size="small"
                                    inputProps={{ maxLength: 30 }}
                                    onChange={(e) => handleTextChange(e, "school")}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button size="large" variant="contained" style={{ width: 150 }} startIcon={<CreateIcon />} onClick={register}>SIGN UP</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default SignUp;

