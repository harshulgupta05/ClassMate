import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
    const adminUser = {
        email: "peter.lee1386@gmail.com",
        password: "admin123"
    }

    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);
    }
    const Logout = () => {
        console.log("Logout");
    }

    return (
        <div className="login">
            {(user.email != "") ? (
                <div className="welcome">
                    <h2>Welcome, <span>{user.name}</span></h2>
                    <button>Logout</button>
                </div>
            ) : (
                <LoginForm />
            )}
        </div>
    );
}

export default LoginForm;
