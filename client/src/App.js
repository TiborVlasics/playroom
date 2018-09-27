import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
