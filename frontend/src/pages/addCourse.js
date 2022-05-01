import React, { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

import { Divider as MuiDivider, Button, Paper, Card as MuiCard, CardHeader, CardContent, CardActions, Grid, TextField as MuiTextField, Typography } from "@mui/material"
import styled from "styled-components/macro";
import { spacing } from "@mui/system";

import ClassIcon from '@mui/icons-material/Class';

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

function AddCourse() {
    const [location, setLocation] = useLocation();
    const [course, setCourse] = useState('');

    const pageTitle = "Add Course";

    const handleTextChange = (e) => setCourse(e.target.value);

    const addCourse = () => {
        const userid = sessionStorage.getItem("user");
        const school = sessionStorage.getItem("school");
        const sch = school.split(' ').join('');

        fetch(`http://localhost:5000/${sch}/${userid}/addCourse`, {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            mode: "cors",
            body: JSON.stringify({
                "course": course
            })
        }).then(response => response.json()).then((data) => {
            if (data.success === true) {
                setLocation("/courses");
            }
            else {
                alert("Failed to add course.")
            }
        });
    }

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title="Add a Course" style={{ textAlign: 'center' }} />
                    <CardContent>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="Course"
                                    placeholder="Course Code (e.g. SCH4U)"
                                    inputProps={{ maxLength: 15 }}
                                    fullWidth
                                    size="small"
                                    onChange={handleTextChange}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button size="large" variant="contained" startIcon={<ClassIcon />} onClick={addCourse}>ADD COURSE</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default AddCourse;