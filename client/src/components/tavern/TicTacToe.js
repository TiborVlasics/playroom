import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame, setCurrentGame } from "../../actions/gameActions";
import Spinner from "../common/Spinner";
import io from "socket.io-client";

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect(
      "/",
      {
        transports: ["polling", "websocket"],
        query: { token: localStorage.jwtToken }
      }
    );

    this.state = { isReplaying: false, replayBoard: null };

    this.move = this.move.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.replay = this.replay.bind(this);
  }

  componentDidMount() {
    if (!this.props.game._id) {
      this.props.history.push("/dashboard");
    } else {
      this.socket.emit("subscribe", this.props.game);

      this.socket.on("game started", game => {
        this.props.setCurrentGame(game);
      });

      this.socket.on("move", game => {
        this.props.setCurrentGame(game);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    this.props.setCurrentGame({});
    this.socket.disconnect();
  }

  move(game, index) {
    const data = { ...game, move: index };
    this.socket.emit("move", data);
  }

  leaveGame() {
    this.props.setCurrentGame({});
  }

  replay(index) {
    setTimeout(() => {
      if (!this.state.isReplaying) this.setState({ isReplaying: true });
      this.setState({ replayBoard: this.props.game.boardState[index] });
      if (this.props.game.boardState.length >= index - 1) {
        this.replay(index + 1);
      } else {
        this.setState({ isReplaying: false });
      }
    }, 1000);
  }

  render() {
    const auth = this.props.auth;
    const game = this.props.game;
    const opponent =
      game.player1 && game.player1.id === auth.user.id
        ? game.player2
        : game.player1;

    const board = this.state.replayBoard
      ? this.state.replayBoard
          .split("")
          .map(col => <div>{col !== "?" ? col : null}</div>)
      : game.isStarted
      ? game.boardState[game.boardState.length - 1]
          .split("")
          .map((col, index) => {
            if (game.nextPlayer === auth.user.id && col === "?") {
              return (
                <div key={index} onClick={() => this.move(game, index)}>
                  {col !== "?" ? col : null}
                </div>
              );
            } else {
              return <div key={index}>{col !== "?" ? col : null}</div>;
            }
          })
      : null;

    let message;
    if (game.isEnded) {
      if (game.winner === null) {
        message = "It's a  draw (O_O)";
      } else if (game.winner === auth.user.id) {
        message = "You won :-D";
      } else {
        message = "Looser...";
      }
    } else {
      if (game.nextPlayer === auth.user.id) {
        message = "It's your turn";
      } else {
        message = "It's your opponents turn";
      }
    }

    const endGamePanel = (
      <div>
        <button onClick={() => this.replay(0)}>Replay</button>
        <button onClick={this.leaveGame}>Leave</button>
      </div>
    );

    return (
      <div className="game-container">
        {opponent ? (
          <div className="opponent">
            <p>Your opponent:</p>
            <p>{opponent.name}</p>
            <img src={opponent.avatar} alt="user avatar" />
          </div>
        ) : null}

        {game.isStarted ? (
          <div className="game">
            <p className="info">{message}</p>
            <div className="game-board">{board}</div>
          </div>
        ) : (
          <Spinner />
        )}
        {game.isEnded && !this.state.isReplaying ? endGamePanel : null}
      </div>
    );
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
