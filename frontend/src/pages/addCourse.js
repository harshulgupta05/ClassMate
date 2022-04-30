import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

function addCourse() {
    const [location, setLocation] = useLocation();

    const addCourse = () => {
        const userid = sessionStorage.getItem("user");
        const school = sessionStorage.getItem("school");
        const course = document.getElementById("courseCode");

        fetch(`http://localhost:5000/${school}/${userid}/addCourse`, {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
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
}