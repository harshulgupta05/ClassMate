import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function Notes() {
    const [location, setLocation] = useLocation();
    const [currNotes, setcurrNotes] = useState([]);
    const [fetched, setFetched] = useState(false);

    const school = sessionStorage.getItem("school");
    const course = sessionStorage.getItem("course");

    if (fetched == false) {
        fetch(`http://localhost:5000/${school}/${course}/notes`, {
            method: "GET",
            mode: "cors"
        }).then(response => response.json()).then(data => {
            for (var i = 0; i < data.notes.length; i++) {
                setcurrNotes(currNotes => [...currNotes, data.notes[i].file])
            }

            setcurrNotes(currNotes => [...new Set(currNotes)]);

            setFetched(true);
        })
    }

    const note = (user, link) => {
        return (
            <div>
                <h6>{user}</h6>
                <br></br>
                <img src={link} width="400" height="400" />                
            </div>
        );
    }

    return (
        <div>
            {
                currNotes.map((note) => {
                    return note(note.user, note.file)
                })
            }
        </div>
    );

    // TODO: finish this, and addNote, then styling
}

export default Notes;