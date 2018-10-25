import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame, setCurrentGame } from "../../actions/gameActions"
import io from "socket.io-client";

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
    return (
      <div className="tic-tac-toe">
        <div className="game-board">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>
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