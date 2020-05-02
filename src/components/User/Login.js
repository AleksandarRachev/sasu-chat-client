import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import global from "../../global";
import Error from "../Messages/Error.js";

class Login extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handeLogin = () => {
    this.setState({ error: null });
    axios
      .post(global.backendUrl + "/users/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(
        (response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href="/"
        },
        (error) => {
          this.setState({ error: <Error message={"Wrong credentials"} /> });
        }
      );
  };

  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        {this.state.error}
        <div className="form-group">
          <label>Username</label>
          <input
            onChange={(e) => this.handleUsernameChange(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => this.handlePasswordChange(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <button onClick={this.handeLogin} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
