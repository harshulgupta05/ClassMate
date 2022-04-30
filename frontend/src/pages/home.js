import { React, Component } from "react";
import { Router, Link, useLocation } from "wouter";

function Home() {
    const [location, setLocation] = useLocation();

    const login = () => {
        setLocation("/login")
    }

    const signup = () => {
        setLocation("/signup")
    }

    return (
        <div>
            <div className="w-50 text-center ml-auto mr-auto">
                <h1 className="display-1">
                    Welcome to ClassMate!
                </h1>
                <button onClick={login} className="btn btn-primary text-center m-2">Login</button>
                <button onClick={signup} className="btn btn-primary text-center m-2">Signup</button>
            </div>
        </div>
    );
}

export default Home;