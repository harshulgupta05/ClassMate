import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function Course() {
    const [location, setLocation] = useLocation();
    const curr = sessionStorage.getItem("course");

    const toNotes = () => {
        setLocation(`/${curr}/notes`);
    }

    const toHW = () => {
        setLocation(`/${curr}/HW`);
    }

    const toChat = () => {
        setLocation(`/${curr}/chat`);
    }

    return (
        <div className="text-center m-auto container">
            <h2 className="display-2">Welcome to {curr}</h2>
            <button onClick={toNotes} className="btn btn-primary">Notes</button>
            <button onClick={toHW} className="btn btn-primary">Homework</button>
            <button onClick={toChat} className="btn btn-primary">Chat</button>
        </div>
    );
}

export default Course;