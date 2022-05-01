import React, { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

import { Divider as MuiDivider, Button, Paper, Card as MuiCard, CardHeader, CardContent, CardActions, Grid, TextField as MuiTextField, Typography } from "@mui/material"
import styled from "styled-components/macro";
import { spacing } from "@mui/system";

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NotesIcon from '@mui/icons-material/Notes';

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

function AddHW() {
    const [location, setLocation] = useLocation();

    const [body, setBody] = useState('');

    const pageTitle = "Add HW"

    const handleTextChange = (e, target) => {
        setBody(e.target.value);
    }

    const addHW = () => {
        const userid = sessionStorage.getItem("user");
        const school = sessionStorage.getItem("school");
        const code = sessionStorage.getItem("course");
        const sch = school.split(' ').join('');
        
        fetch(`http://localhost:5000/${sch}/${userid}/${code}/addHW`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            mode: "cors",
            body: JSON.stringify({
                "homework": body
            }),
        }).then(response => response.json()).then(data => {
            if (data.success === "true") {
                console.log("success");
                alert("Successfully uploaded HW.");
                setLocation("/course");
            }
            else {
                alert("Failed to upload note.");
            }
        });
    }

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title="Add your HW" style={{ textAlign: 'center' }} />
                    <CardContent>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="Enter HW here..."
                                    placeholder="Enter HW here..."
                                    maxRows={10}
                                    fullWidth
                                    value={body}
                                    size="small"
                                    onChange={(e) => handleTextChange(e, "userid")}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button size="large" variant="contained" style={{ width: 120 }} startIcon={<NotesIcon />} onClick={addHW}>ADD HW</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default AddHW;
