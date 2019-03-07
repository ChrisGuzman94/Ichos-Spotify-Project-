import React, { Component } from "react";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button> */}
        <div
          style={{ margin: "20px" }}
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          {/* <ul style={{textDecoration: "none"}} className="navbar-nav">
          <li className="nav-item active"> */}
          {/* <a style={{color: "palevioletred", padding: "10px", alignContent: "right", textDecoration: "none", marginBottom: "10px"}} className="nav-link" href="/">
              Home
            </a> */}
          {/* </li>
        </ul> */}
        </div>
      </nav>
    );
  }
}

export default Nav;
