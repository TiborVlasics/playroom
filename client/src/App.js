import React, { Component } from "react";
import { connect } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import setAuthToken from "./helper/setAuthToken";

import { setCurrentUser } from "./actions/authActions";
import { getCurrentGame } from "./actions/gameActions";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import TicTacToe from "./components/tavern/TicTacToe";
import Pong from "./components/tavern/Pong";
import SecretRoute from "./components/SecretRoute";
import Navbar from "./components/layout/Navbar";

import "./style/App.css";
import "./style/Spinner.css";
import "./style/nav.css";
import "./style/usersbar.css";
import "./style/chat.css";
import "./style/auth.css";
import "./style/games.css";
import "./style/history.css";
import "./style/tic-tac-toe.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentGame());
}

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = null;
    if (this.props.auth.isAuthenticated) {
      this.initSocketConnection();
    }
  }

  initSocketConnection() {
    this.socket = io.connect(
      "/",
      {
        transports: ["polling", "websocket"],
        query: { token: localStorage.jwtToken }
      }
    );
  }

  componentWillReceiveProps(props) {
    if (props.auth.isAuthenticated === true) {
      this.initSocketConnection();
    } else if (props.auth.isAuthenticated === false) {
      setTimeout(this.socket.close, 1000);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="main">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <SecretRoute
                exact
                path="/dashboard"
                component={Dashboard}
                socket={this.socket}
              />
              <SecretRoute
                exact
                path="/tictactoe/:id"
                component={TicTacToe}
                socket={this.socket}
              />
              <SecretRoute
                exact
                path="/pong/:id"
                component={Pong}
                socket={this.socket}
              />
              <Route render={() => <Redirect to="/dashboard" />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
