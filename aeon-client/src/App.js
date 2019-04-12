import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import jwt from 'jwt-decode';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1><img src= "https://bit.ly/2UuEgl3"></img></h1>
      <img src="https://bit.ly/2ULxK8Q" id="gtd"></img>
      </div>
    );
  }}

// async componentDidMount() {
//   try {
//     const { user } = await verifyToken();
//     if (user !== undefined) {
//     this.setState({
//       currentUser: user
//     })
//     await this.fetchUser();
//     } else {
//       this.props.history.push('/');
//     }
//   } catch (e) {
//     this.props.history.push('/');
//   }
// }

export default App;
