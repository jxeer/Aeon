import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import Projects from './components/Projects';
import { loginUser, postUser, updateToken } from './services/apiHelper';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      token: '',
      loginData: {
        email: '',
        password: '',
      },
      registerData: {
        user_name: '',
        email: '',
        password: '',
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginData: {
        ...prevState.loginData,
        [name]: value
      }
    }))
  }

  async handleLogin(ev) {
    ev.preventDefault();
    const { loginData } = this.state
    try {
      const resp = await loginUser(loginData);
      this.setState({
        user: resp.user,
        token: resp.token,
        loginData: {
          email: '',
          password: ''
        }
      });
      this.props.history.push(`/users`);
    } catch (e) {
      console.log(e);
    }
  }

  handleRegisterChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target
    this.setState(prevState => ({
      registerData: {
        ...prevState.registerData,
        [name]: value
      }
    }))
  }

  async handleRegister(ev) {
    ev.preventDefault();
    const { registerData } = this.state
    try {
      const resp = await postUser(registerData);
      localStorage.setItem('AeonUser', resp)
      this.setState({
        token: resp.token,
        user: resp.user,
        registerData: {
          email: '',
          password: '',
          user_name: '',
        }
      })
      this.props.history.push("/users");
    } catch(e) {
      console.log(e);
    }
  }

  logOut(ev) {
    ev.preventDefault();
    localStorage.setItem('AeonToken', '');
    updateToken('');
    this.setState({
      user: {},
      token: '',
    });
    this.props.history.push(`/`);
  }

  componentDidMount() {
  }

  render() {
    const { user, token, registerData, loginData } = this.state;
    return (
      <div className="App">
        <Header
          user={user}
          token={token}
          loginData={loginData}
          handleLogin={this.handleLogin}
          handleChange={this.handleChange}
          logOut={this.logOut}
          />
        <Route exact path="/" render={() => (
          <Main
            handleRegisterChange={this.handleRegisterChange}
            handleRegister={this.handleRegister}
            registerData={registerData}
            />
        )}/>
        <Route exact path="/About/" render={(props) => (
          <About
            user={user}
            token={token}
            />
        )}/>
        <Route exact path="/components/projects" render={(props) => (
          <Projects
            user={user}
            token={token}
            />
        )}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
