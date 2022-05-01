import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function Course() {
    const [location, setLocation] = useLocation();

    const toNotes = () => {
        const curr = sessionStorage.getItem("course");
        setLocation(`/${curr}/notes`);
    }

    const toHW = () => {
        const curr = sessionStorage.getItem("course");
        setLocation(`/${curr}/HW`);
    }

    const toChat = () => {
        const curr = sessionStorage.getItem("course");
        setLocation(`/${curr}/chat`);
    }

    return (
        <div className="text-center m-auto container">
            <button onClick={toNotes} className="btn btn-primary">Notes</button>
            <button onClick={toHW} className="btn btn-primary">Homework</button>
            <button onClick={toChat} className="btn btn-primary">Chat</button>
        </div>
    );
}

export default Course;