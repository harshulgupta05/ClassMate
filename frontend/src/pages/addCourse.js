import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

function AddCourse() {
    const [location, setLocation] = useLocation();

    const addCourse = () => {
        const userid = sessionStorage.getItem("user");
        const school = sessionStorage.getItem("school");
        const code = document.getElementById("courseCode").value;

        fetch(`http://localhost:5000/${school}/${userid}/addCourse`, {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            mode: "cors",
            body: JSON.stringify({
                "course": code
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
        <div>
            <div className="w-100 text-center ml-auto mr-auto d-flex justify-content-center pt-5 align-items-center">
                <div className="register">
                    <h2 className="display-2 text-center">
                        Add a Course
                    </h2>
                    <div className="form-group text-center">
                        <label for="User ID" className="mx-2 form-label">Course Code (e.g. SCH4U)</label>
                        <input type="text" id="courseCode" placeholder="######" className="m-auto pl-3 form-control w-75" />
                    </div>
                    <div className="text-center">
                        <button onClick={addCourse} type="submit" className="btn btn=primary text-center m-2">Add Course</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;