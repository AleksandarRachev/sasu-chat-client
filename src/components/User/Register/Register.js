import React, { Component } from "react";
import axios from "axios";
import global from "../../../global";
import Error from "../../Messages/Error";

class Register extends Component {
  state = {
    username: null,
    password: null,
    repeatPassword: null,
    error: null,
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleRepeatPasswordChange = (repeatPassword) => {
    this.setState({ repeatPassword });
  };

  handleRegister = () => {
    axios
      .post(global.backendUrl + "/users", {
        username: this.state.username,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
      })
      .then(
        (response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/";
        },
        (error) => {
          this.setState({
            error: <Error message={error.response.data.message} />,
          });
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
        <div className="form-group">
          <label>Repeat password</label>
          <input
            onChange={(e) => this.handleRepeatPasswordChange(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <button onClick={this.handleRegister} className="btn btn-primary m-2">
          Register
        </button>
      </form>
    );
  }
}

export default Register;
