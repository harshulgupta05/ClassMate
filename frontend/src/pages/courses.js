import React, { Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

import { Helmet } from "react-helmet-async";

import { styled } from '@mui/material/styles';
import {
    Divider as MuiDivider,
    Button,
    Paper,
    Card as MuiCard,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    TextField as MuiTextField,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableRow
} from "@mui/material"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Wrapper = styled(Paper)`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #233044!important;
`;

const Card = styled(MuiCard)`
    padding: 20px;
    width: 800px;
    height: 350px;
    margin: auto;
`;

const MAX_COURSES = 4;

function Courses() {
    const [location, setLocation] = useLocation();
    const [currCourses, setcurrCourses] = useState([]);
    const [fetched, setFetched] = useState(false);

    const pageTitle = "Courses"

    const userid = sessionStorage.getItem("user");
    const school = sessionStorage.getItem("school");
    const sch = school.split(' ').join('');

    if (fetched == false) {
        fetch(`http://localhost:5000/${sch}/${userid}/courses`, {
            method: "GET",
            mode: "cors"
        }).then(response => response.json()).then((data) => {
            console.log(data.courses[0]);
            const length = data.courses.length;

            if (data.courses.length === 0) {
                setLocation("/addCourse");
            }
            else if (data.courses.length == 1) {
                setcurrCourses(currCourses => [...currCourses, data.courses[0]]);
            }
            else if (data.courses.length == 2) {
                setcurrCourses(currCourses => [...currCourses, data.courses[0]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[1]]);
            }
            else if (data.courses.length == 3) {
                setcurrCourses(currCourses => [...currCourses, data.courses[0]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[1]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[2]]);
            }
            else if (data.courses.length == 4) {
                setcurrCourses(currCourses => [...currCourses, data.courses[0]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[1]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[2]]);
                setcurrCourses(currCourses => [...currCourses, data.courses[3]]);
            }

            setcurrCourses(currCourses => [...new Set(currCourses)]);

            setFetched(true);            
        });
    }

    const data = {
        courses: [...currCourses]
    };

    const btnCourse = (courseCode) => {
        if (courseCode) {
            return <Button size="small" variant="contained" onClick={() => {
                sessionStorage.setItem("course", courseCode);
                return setLocation("/course");
            }}>{`View`}</Button>;
        } else {
            return <Button size="small" variant="contained" onClick={() => setLocation("/addCourse")}>{`Add`}</Button>;
        }
    }

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title={`${school} Courses for ${userid}`} style={{ textAlign: 'center' }} />
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
                                <TableBody>
                                    {currCourses.map((n, i) => (
                                        <StyledTableRow key={`row-${i}`}>
                                            <StyledTableCell component="th" scope="row">
                                                {currCourses[i] || "N/A"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" style={{ width: 180 }}>
                                                {btnCourse(currCourses[i] || "")}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Wrapper>
        </React.Fragment>
    );
}

export default Courses;