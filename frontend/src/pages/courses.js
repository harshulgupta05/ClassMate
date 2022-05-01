import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

function Courses() {
    const [location, setLocation] = useLocation();
    const [currCourses, setcurrCourses] = useState([]);
    const [fetched, setFetched] = useState(false);

    const userid = sessionStorage.getItem("user");
    const originalSchool = sessionStorage.getItem("school");
    const school = originalSchool.split(' ').join('');

    if (fetched == false) {
        fetch(`http://localhost:5000/${school}/${userid}/courses`, {
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

    const courseSelected = (code) => {
        setLocation("/course");
        sessionStorage.setItem("course", code);
    }

    const button = (name) => {
        return (
            <div>
                <button onClick={courseSelected(name)} className="btn btn-primary">{name}</button>
            </div>
        );        
    }

    return (
        <div>
            {
                currCourses.map((number) => {
                    return button(number);
                })
            }
        </div>
    );
}

export default Courses;