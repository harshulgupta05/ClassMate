import logo from './logo.svg';
import './App.css';
import {Router, Link} from "wouter";
import React, { useState, useEffect } from "react";
import PageRouter from "./components/router.jsx";
import useHashLocation from "./hooks/wouter-hash";

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
      <main role="main" className="wrapper">
        <div className="content">
          <PageRouter />
        </div>
      </main>
    </Router>
  );
}

export default App;
