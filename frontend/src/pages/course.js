import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function Course() {
    const [location, setLocation] = useLocation();
    const curr = sessionStorage.getItem("course");

    const toNotes = () => {
        setLocation(`/notes`);
    }

    const toHW = () => {
        setLocation(`/HW`);
    }

    const toChat = () => {
        setLocation(`/chat`);
    }

    const toAddNotes = () => {
        setLocation("/addNotes")
    }

    const toAddHW = () => {
        setLocation("/addHW")
    }

    return (
        <div className="text-center m-auto container">
            <h2 className="display-2">Welcome to {curr}</h2>
            <button onClick={toNotes} className="btn btn-primary">Notes</button>
            <button onClick={toAddNotes} className="btn btn-primary">Add Notes</button>
            <button onClick={toHW} className="btn btn-primary">Homework</button>
            <button onClick={toAddHW} className="btn btn-primary">Add Homework</button>
            <button onClick={toChat} className="btn btn-primary">Chat</button>
        </div>
    );
}

export default Course;