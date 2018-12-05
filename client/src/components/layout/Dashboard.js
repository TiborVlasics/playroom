import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentGame } from "../../actions/gameActions";
import io from "socket.io-client";
import Navbar from "./Navbar";

import ChatContainer from "../chat/ChatContainer";
import GameContainer from "../games/GameContainer";

class Dashboard extends Component {
  constructor() {
    super();
    this.socket = io.connect(
      "/",
      {
        transports: ["polling", "websocket"],
        query: { token: localStorage.jwtToken }
      }
    );
  }
  pushUserToGame(game) {
    if (game.kind === "amoebas") {
      this.props.history.push(`/tictactoe/${game._id}`);
    } else if (game.kind === "pongs") {
      this.props.history.push(`/pong/${game._id}`);
    }
  }

  componentDidMount() {
    this.props.getCurrentGame();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty("currentGame"))
      if (nextProps.currentGame.isFull) {
        this.pushUserToGame(nextProps.currentGame);
      }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          <ChatContainer socket={this.socket} />
          <GameContainer socket={this.socket} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentGame: PropTypes.object.isRequired,
  getCurrentGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentGame: state.currentGame
});

export default connect(
  mapStateToProps,
  { getCurrentGame }
)(Dashboard);
