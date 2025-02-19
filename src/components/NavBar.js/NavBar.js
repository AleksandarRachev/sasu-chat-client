import React, { Component } from "react";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

class NavBar extends Component {
  render() {
    
    const {onLeave} = this.props;

    let userButton;

    function handleLogout() {
      onLeave()
      localStorage.clear();
      window.location.href="/"
    }

    if (user) {
      userButton = (
        <button
          onClick={() => handleLogout()}
          className="btn btn-primary"
        >
          Logout
        </button>
      );
    } else {
      userButton = (
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{zIndex:"1000"}}>
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Link
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/">
                  Action
                </Link>
                <Link className="dropdown-item" to="/">
                  Another action
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/">
                  Something else here
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="/" aria-disabled="true">
                Disabled
              </Link>
            </li>
          </ul>
          {userButton}
        </div>
      </nav>
    );
  }
}

export default NavBar;
