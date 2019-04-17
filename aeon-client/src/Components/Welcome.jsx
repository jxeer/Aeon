import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import jwt from 'jwt-decode';


const Welcome = () => {
  return (
    <div>
      <div className="App">
        <h1><img src= "https://bit.ly/2UuEgl3"></img></h1>
        <img src="https://bit.ly/2ULxK8Q" id="gtd"></img>
      </div>

      <nav className="header-nav">
        <Link to="/users/login">Login</Link>
        <Link to="/users">Sign Up</Link>

       </nav>
    </div>
  )
}

export default Welcome;
