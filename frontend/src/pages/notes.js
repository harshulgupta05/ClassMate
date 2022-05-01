import React, { Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";
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
    TextField,
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

function Notes() {
    const [location, setLocation] = useLocation();
    const [currNotes, setcurrNotes] = useState([]);
    const [fetched, setFetched] = useState(false);

    const school = sessionStorage.getItem("school");
    const course = sessionStorage.getItem("course");

    const pageTitle = "Notes";

    if (fetched == false) {
        fetch(`http://localhost:5000/${school}/${course}/notes`, {
            method: "GET",
            mode: "cors"
        }).then(response => response.json()).then(data => {
            for (var i = 0; i < data.notes.length; i++) {
                setcurrNotes(currNotes => [...currNotes, data.notes[i]])
            }

            setcurrNotes(currNotes => [...new Set(currNotes)]);

            setFetched(true);
        })
    }

    const note = (txt) => {
        return (
            <TextField type="text" value={txt} variant="outlined" inputProps={{ readOnly: true }} />
        );
    }

    return (
        <React.Fragment>
            <Helmet title={pageTitle} />
            <Wrapper>
                <Card>
                    <CardHeader title={`${school} Notes for ${course}`} style={{ textAlign: 'center' }} />
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
                                <TableBody>
                                    {currNotes.map((n, i) => (
                                        <StyledTableRow key={`row-${i}`}>
                                            <StyledTableCell component="th" scope="row">
                                                {currNotes[i]}
                                            </StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                                {note(currNotes[i] || "")}
                                            </StyledTableCell> */}
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

    // TODO: finish this, and addNote, then styling
}

export default Notes;