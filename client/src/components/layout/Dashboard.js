import React, { Component } from "react";
import { connect } from "react-redux";
import History from "./History";

import ChatRoom from "../chat/ChatRoom";
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
        <ChatRoom socket={this.props.socket} />
        <Tavern socket={this.props.socket} />
        <History />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGame: state.currentGame
});

export default connect(mapStateToProps)(Dashboard);
