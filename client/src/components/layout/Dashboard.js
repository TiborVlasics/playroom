import React, { Component } from "react";
import { connect } from "react-redux";

import ChatWindow from "../chat/ChatWindow";
import Tavern from "../tavern/Tavern";

class Dashboard extends Component {
  pushUserToGame(game) {
    if (game.hasOwnProperty("_id") && game.isFull) {
      if (game.kind === "tictactoes") {
        this.props.history.push(`/tictactoe/${game._id}`);
      } else if (game.kind === "pongs") {
        this.props.history.push(`/pong/${game._id}`);
      }
    }
  }

  componentDidMount() {
    this.pushUserToGame(this.props.currentGame);
  }

  componentWillReceiveProps(nextProps) {
    this.pushUserToGame(nextProps.currentGame);
  }

  render() {
    return (
      <div className="dashboard">
        <ChatWindow socket={this.props.socket} />
        <Tavern socket={this.props.socket} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGame: state.currentGame
});

export default connect(mapStateToProps)(Dashboard);
