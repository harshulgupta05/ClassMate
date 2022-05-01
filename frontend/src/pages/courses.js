import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

function Courses() {
    const [location, setLocation] = useLocation();

    const userid = sessionStorage.getItem("user");
    const school = sessionStorage.getItem("school");

    const courses = fetch(`http://localhost:5000/${school}/${userid}/courses`, {
        method: "GET"
    }).then(response => response.json()).then((data) => {
        if (data.courses.length === 0) {
            setLocation("/courses");
        }

        // TODO: send course code to courseHome page (sessionStorage)
        if (data.courses.length == 1) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[0].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                    </div>
                </div>
            );         
        }

        if (data.courses.length == 2) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[0].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                            <h4 className="display-4">{data.courses[1].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                    </div>
                </div>
            );         
        }

        if (data.courses.length == 3) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[0].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                            <h4 className="display-4">{data.courses[1].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[2].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                            <button onClick={setLocation("/addCourse")} className="btn btn-primary">Add Another Course</button>
                        </div>
                    </div>
                </div>
            );         
        }

        if (data.courses.length == 3) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[0].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                            <h4 className="display-4">{data.courses[1].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">{data.courses[2].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                        <div className="col">
                        <h4 className="display-4">{data.courses[3].code}</h4>
                            <button onClick={setLocation("/courseHome")} className="btn btn-primary">Go To Course</button>
                        </div>
                    </div>
                </div>
            );         
        }
    });
}

export default Courses;