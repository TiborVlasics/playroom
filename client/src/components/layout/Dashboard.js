import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentGame } from "../../actions/gameActions";
import io from "socket.io-client";

import ChatWindow from "../chat/ChatWindow";
import Tavern from "../tavern/Tavern";

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
    if (game.kind === "tictactoes") {
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
      <div className="dashboard">
        <ChatWindow socket={this.socket} />
        <Tavern socket={this.socket} />
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
