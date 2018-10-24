import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {

  pushUserToGame(game) {
    if (game.hasOwnProperty("_id") && game.isStarted) {
      this.props.history.push(`/tictactoe/${game._id}`);
    }
  }

  componentDidMount() {
    this.pushUserToGame(this.props.currentGame);
  }

  componentWillReceiveProps(nextProps) {
    this.pushUserToGame(nextProps.currentGame)
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentGame: state.currentGame })

export default connect(mapStateToProps)(Dashboard);
