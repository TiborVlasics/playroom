import React, { Component } from "react";
import { connect } from "react-redux";
import History from "./History";

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
      <div>
        <div className="dashboard">
          <History />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGame: state.currentGame
});

export default connect(mapStateToProps)(Dashboard);
