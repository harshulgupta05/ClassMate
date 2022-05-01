import React from 'react';
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

import { Divider as MuiDivider, Button, Paper, Card as MuiCard, CardContent, CardActions, Grid, Typography, CardHeader, ButtonGroup } from "@mui/material"
import styled from "styled-components/macro";

import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NotesIcon from '@mui/icons-material/Notes';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SchoolIcon from '@mui/icons-material/School';

const Wrapper = styled(Paper)`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #233044!important;
`;

const Card = styled(MuiCard)`
    padding: 20px;
    width: 700px;
    height: 250px;
    margin: auto;
`;

function Course() {
    const [location, setLocation] = useLocation();
    const curr = sessionStorage.getItem("course");

    const toNotes = () => {
        setLocation(`/notes`);
    }

    const toHW = () => {
        setLocation(`/HW`);
    }

    const toCourses = () => {
        setLocation(`/courses`);
    }

    const toAddNotes = () => {
        setLocation("/addNotes")
    }

    const toAddHW = () => {
        setLocation("/addHW")
    }

    const toAddCourse = () => {
        setLocation("/addCourse")
    }

    const pageTitle = "Course Home";
    const welcome = "Welcome to " + sessionStorage.getItem("course") + "!";

    return (
        // <div className="text-center m-auto container">
        //     <h2 className="display-2">Welcome to {curr}</h2>
        //     <button onClick={toNotes} className="btn btn-primary">Notes</button>
        //     <button onClick={toAddNotes} className="btn btn-primary">Add Notes</button>
        //     <button onClick={toHW} className="btn btn-primary">Homework</button>
        //     <button onClick={toAddHW} className="btn btn-primary">Add Homework</button>
        //     <button onClick={toChat} className="btn btn-primary">Chat</button>
        // </div>
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title={welcome} style={{ textAlign: 'center '}} />
                    <CardActions style={{ textAlign: 'center' }}>
                        <ButtonGroup variant="outlined" aria-label="medium outlined button group">
                            <Button variant="contained" style={{ width: 120 }} startIcon={<NoteAddIcon />} onClick={toAddNotes}>ADD NOTES</Button>
                            <Button variant="contained" style={{ width: 120 }} startIcon={<NoteAddIcon />} onClick={toAddHW}>ADD HW</Button>
                            <Button variant="contained" style={{ width: 120 }} startIcon={<NotesIcon />} onClick={toNotes}>VIEW CLASS NOTES</Button>
                            <Button variant="contained" style={{ width: 120 }} startIcon={<HomeWorkIcon />} onClick={toHW}>VIEW CLASS HW</Button>
                            <Button variant="contained" style={{ width: 120 }} startIcon={<SchoolIcon />} onClick={toCourses}>BACK TO COURSES</Button>
                            <Button variant="contained" style={{ width: 120 }} startIcon={<SchoolIcon />} onClick={toAddCourse}>BACK TO ADD COURSE</Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default Course; 