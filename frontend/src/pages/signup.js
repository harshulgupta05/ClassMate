import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation } from "wouter";

function SignUp() {
    const [location, setLocation] = useLocation();

    const register = () => {
        const userid = document.getElementById("userid").value;
        const password = document.getElementById("pw").value;
        const school = document.getElementById("school").value;

        sessionStorage.setItem("user", userid);
        sessionStorage.setItem("school", school);

        // add error handling
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: JSON.stringify({
                "number": userid,
                "password": password,
                "school": school
            })
        }).then(response => response.json()).then((data) => {
            if (data.success === true) {
                setLocation("/courses");
            }
        });
    }

    return (
        <div>
            <div className="w-100 text-center ml-auto mr-auto d-flex justify-content-center pt-5 align-items-center">
                <div className="register">
                    <h2 className="display-2 text-center">
                        Sign Up for ClassMate!
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
                        <label for="School Name" className="mx-2 form-label">School Name (full name, e.g. Lorne Park Secondary School)</label>
                        <input type="text" id="school" placeholder="Lorne Park Secondary School" className="m-auto pl-3 form-control w-75" />
                    </div>
                    <div className="text-center">
                        <button onClick={register} type="submit" className="btn btn=primary text-center m-2">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

