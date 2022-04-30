// import logo from './logo.svg';
import './App.css';
// import {Router, Link} from "wouter";
import React, { useState, useEffect } from "react";
// import PageRouter from "./components/router.jsx";
import useHashLocation from "./hooks/wouter-hash";
import Home from './pages/home';
import { Router, Route} from "wouter";
import SignUp from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Router hook={useHashLocation}>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
