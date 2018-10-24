import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {

  componentWillReceiveProps(nextProps) {
    let game = nextProps.currentGame;
    if (game.hasOwnProperty("_id") && game.isStarted) {
      this.props.history.push(`/tictactoe/${nextProps.currentGame._id}`)
    }
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
