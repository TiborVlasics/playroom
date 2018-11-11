import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="nav-links">
        <span className="nav-item">
          <Link to="/chat">Chat</Link>
        </span>
        <span className="nav-item">
          <Link to="/tavern">Tavern</Link>
        </span>
        <div className="user-links">
          <span className="nav-item">{user.name}</span>
          <img className="nav-item nav-img" src={user.avatar} alt={user.name} />
          <span className="nav-item">
            <a href="" onClick={this.onLogoutClick.bind(this)}>
              Logout
            </a>
          </span>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="nav-links">
        <span className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </span>
        <span className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </span>
      </div>
    );

    return (
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo">
            <Link to="/dashboard">Tic-tac-toe Playroom</Link>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
