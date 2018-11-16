import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./helper/setAuthToken";
import io from "socket.io-client";
import { setCurrentUser } from "./actions/authActions";
import { getCurrentGame } from "./actions/gameActions";
import { connect } from "react-redux";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import ChatRoom from "./components/chat/ChatRoom";
import Tavern from "./components/tavern/Tavern";
import TicTacToe from "./components/tavern/TicTacToe";
import Pong from "./components/tavern/Pong";
import SecretRoute from "./components/SecretRoute";
import Navbar from "./components/layout/Navbar";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentGame());
}

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io;
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
      this.socket.close();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <SecretRoute
                path="/chat"
                component={ChatRoom}
                socket={this.socket}
              />
              <SecretRoute exact path="/dashboard" component={Dashboard} />
              <SecretRoute
                exact
                path="/tavern"
                component={Tavern}
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
