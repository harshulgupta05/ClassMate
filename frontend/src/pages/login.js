import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function Login() {
    const [location, setLocation] = useLocation();

    const login = () => {
        const userid = document.getElementById("userid").value;
        const password = document.getElementById("pw").value;
        const school = document.getElementById("school").value;
        const sch = school.split(' ').join('');

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            mode: "cors",
            body: JSON.stringify({
                "number": userid,
                "password": password,
                "school": school
            }),
        }).then(response => response.json()).then(data => {
            if (data.success === "true") {
                console.log("success");
                sessionStorage.setItem("user", userid);                
                sessionStorage.setItem("school", sch);
                setLocation("/courses");
            }
            else {
                alert("Login failed. Please try again.");
            }
        });
    }

    return (
        <div>
            <div className="w-100 text-center ml-auto mr-auto d-flex justify-content-center pt-5 align-items-center">
                <div className="register">
                    <h2 className="display-2 text-center">
                        Login to ClassMate!
                    </h2>
                    <div className="form-group text-center">
                        <label for="User ID" className="mx-2 form-label">User ID (please use your Student #)</label>
                        <input type="text" id="userid" placeholder="######" className="m-auto pl-3 form-control w-75" />
                    </div>
                    <div className="form-group text-center">
                        <label for="Password" className="mx-2 form-label">Password</label>
                        <input type="password" id="pw" placeholder="Password" className="m-auto pl-3 form-control w-75" />
                    </div>
                    <div className="form-group text-center">
                        <label for="Password" className="mx-2 form-label">School Name</label>
                        <input type="text" id="school" placeholder="Lorne Park Secondary School" className="m-auto pl-3 form-control w-75" />
                    </div>                
                    <div className="text-center">
                        <button onClick={login} type="submit" className="btn btn=primary text-center m-2">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
