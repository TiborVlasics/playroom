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

    this.move = this.move.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
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

    this.socket.on("move", game => {
      this.props.setCurrentGame(game)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard")
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  move(game, index) {
    const data = { ...game, move: index }
    this.socket.emit("move", data)
  }

  leaveGame() {
    this.props.setCurrentGame({})
  }

  render() {
    const auth = this.props.auth;
    const game = this.props.game;
    const board = game.isStarted ? game.boardState[game.boardState.length - 1]
      .split('')
      .map((col, index) => {
        if (game.nextPlayer === this.props.auth.user.id && col === "?") {
          return <div
            key={index}
            onClick={() => this.move(game, index)}>
            {col !== "?" ? col : null
            }
          </div>
        } else {
          return <div key={index}>
            {col !== "?" ? col : null}
          </div>
        }
      }) : null

    let message;
    if (game.isEnded) {
      if (game.winner === null) {
        message = "It's a  draw (O_O)"
      } else if (game.winner === auth.user.id) {
        message = "You won :-D"
      } else {
        message = "Looser..."
      }
    } else {
      if (game.nextPlayer === auth.user.id) {
        message = "It's your turn"
      } else {
        message = "It's your opponents turn"
      }
    }

    const endGamePanel = <div>
      <button>Replay</button>
      <button onClick={this.leaveGame}>Leave</button>
    </div>

    return (
      <div className="tic-tac-toe">
        <p>{message}</p>
        {game.isStarted ?
          <div className="game-board">
            {board}
          </div> : <Spinner />}
        {game.isEnded ? endGamePanel : null}
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