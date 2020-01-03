import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          //refactor with <Link to="/">
          <div>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/auth/email">Sign Up</Link>
            </li>
            <li>
              {/* <Link to="/auth/google">Login With Google</Link> */}
              <a href="/auth/google">Login With Google</a>
            </li>
            {/* <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">TutorialSignUp</a>
            </li> */}
          </div>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <Link to="/api/logout">Logout</Link>
          </li>,
          <li key="4">
            <Link to="/auth/signout">Sign Out</Link>
            </li>,
            <li key="5">
              <Link to="/dashboard">Dashboard</Link>
            </li>
        ];
    }
  }
  render() {
    console.log(
      "Header component render function this.props.auth: ",
      this.props.auth
    );
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="brand-logo"
          >
            Archon
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
