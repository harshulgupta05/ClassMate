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
import Courses from './pages/courses';
import AddCourse from './pages/addCourse';
import Course from './pages/course';
import AddNote from './pages/addNote';
import Notes from './pages/notes';
import { HelmetProvider, Helmet } from "react-helmet-async";


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

    <HelmetProvider>
      <Helmet titleTemplate='%s | ClassMate' defaultTitle="Welcome to ClassMate!" />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/courses" component={Courses} />
        <Route path="/addCourse" component={AddCourse} />
        <Route path="/course" component={Course} />
        <Route path="/addNotes" component={AddNote} />
        <Route path="/notes" component={Notes} />
      </Router>
    </HelmetProvider>
  );
}

export default App;
