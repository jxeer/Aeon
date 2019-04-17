import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/Login';
import './App.css';
import { loginUser, postUser, getAllActions, createAction } from './services/apihelper';
import jwt from 'jwt-decode';
import Welcome from './Components/Welcome';
import ActionList from './Components/ActionList'
import CreateAction from './Components/CreateAction'

class App extends Component {
  constructor() {
    super();
      this.state = {
        user: {},
        token: "",
        loginData: {
          email: "",
          password: ""
        },
        registerData: {
          name: "",
          email: "",
          password: ""
        },
        actions: [],
        newActionData: {
          name: '',
          status: '',
        }
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleRegisterChange = this.handleRegisterChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.logOut = this.logOut.bind(this);
      this.fetchAllActions = this.fetchAllActions.bind(this);
      this.handleActionChange = this.handleActionChange.bind(this)
      this.makeAction = this.makeAction.bind(this)
    }

    handleChange(ev) {
      ev.preventDefault();
      const { name, value } = ev.target;
      this.setState(prevState => ({
        loginData: {
          ...prevState.loginData,
          [name]: value
        }
      }));
    }

    async handleLogin(ev) {
      ev.preventDefault();
      const { loginData } = this.state;
      const resp = await loginUser(loginData);
      this.setState({
        user: resp.user,
        token: resp.token,
        loginData: {
          email: "",
          password: ""
        }
      });
      this.props.history.push(`/users`);
    }

    handleRegisterChange(ev) {
      ev.preventDefault();
      const { name, value } = ev.target;
      this.setState(prevState => ({
        registerData: {
          ...prevState.registerData,
          [name]: value
        }
      }));
    }

    async handleRegister(ev) {
      ev.preventDefault();
      const { registerData } = this.state;
      const resp = await postUser(registerData);
      this.setState({
        token: resp.token,
        user: resp.user,
        registerData: {
          email: "",
          password: "",
          name: ""
        }
      });
      this.props.history.push("/users");
    }

    logOut(ev) {
      this.setState({
        user: {},
        token: ""
      });
      this.props.history.push(`/`);
    }

    async fetchAllActions() {
      const actions = await getAllActions()
      this.setState({
        actions
      })
      console.log(this.state.actions);
    }

    async handleActionChange(ev) {
      ev.preventDefault();
      const { name, value } = ev.target;
      this.setState(prevState => ({
        newActionData: {
          ...prevState.newActionData,
          [name]: value
        }
      }));
    }

    async makeAction(e) {
      e.preventDefault();
      const { newActionData } = this.state
      const resp = await createAction(newActionData)
      console.log("make action");
      console.log(newActionData);
      console.log(resp);
      await this.fetchAllActions()
    }


    async componentDidMount() {
      await this.fetchAllActions()
    }

    render() {
      return (
          <div className="App">
          <ActionList
          actions={this.state.actions}/>
          <CreateAction
          handleActionChange={this.handleActionChange}
          makeAction={this.makeAction}
          newActionData={this.state.newActionData}
            />
            <Route exact path="/" render={(props) => (
              <Welcome />
            )} />

            <Route exact path ="/users/login" render={(props) => (
              <Login
                onChange={this.handleChange}
                onSubmit={this.handleLogin}/>
            )} />

        </div>
      )
    }
  }

export default App;
