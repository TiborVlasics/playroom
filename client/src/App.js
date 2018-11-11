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
import { setCurrentUser } from "./actions/authActions";
import { getCurrentGame } from "./actions/gameActions";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import ChatRoom from "./components/chat/ChatRoom";
import Tavern from "./components/tavern/Tavern";
import TicTacToe from "./components/tavern/TicTacToe";
import SecretRoute from "./components/SecretRoute";
import Navbar from "./components/layout/Navbar";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentGame());
}

class App extends Component {
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
              <SecretRoute path="/chat" component={ChatRoom} />
              <SecretRoute exact path="/dashboard" component={Dashboard} />
              <SecretRoute exact path="/tavern" component={Tavern} />
              <SecretRoute exact path="/tictactoe/:id" component={TicTacToe} />
              <Route render={() => <Redirect to="/dashboard" />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
