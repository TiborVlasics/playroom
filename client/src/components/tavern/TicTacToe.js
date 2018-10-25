import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame, setCurrentGame } from "../../actions/gameActions"
import io from "socket.io-client";
import Spinner from "../common/Spinner";

class TicTacToe extends Component {
  constructor() {
    super();
    this.socket = io("/tic-tac-toe", {
      transports: ["polling"],
      query: { token: localStorage.jwtToken }
    });
  }

  componentDidMount() {
    this.props.getCurrentGame();
    if (!this.props.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard")
    }

    this.socket.on("connect", () => {
      this.socket.emit("join me to a room please", this.props.game)
    })
    this.socket.on("game started", game => {
      this.props.setCurrentGame(game)
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    let game = this.props.game;
    let content = game.isStarted
      ? game.boardState[game.boardState.length - 1]
        .split('')
        .map(col => <div>{col}</div>)
      : <Spinner />

    return (
      <div className="tic-tac-toe">
        <div className="player1"></div>
        <div className="game-board">
          {content}
        </div>
        <div className="player2"></div>
      </div>
    )
  }
}

TicTacToe.propTypes = {
  auth: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  getCurrentGame: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.currentGame
});

export default connect(
  mapStateToProps,
  { getCurrentGame, setCurrentGame }
)(TicTacToe);