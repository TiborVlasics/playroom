import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame, setCurrentGame } from "../../actions/gameActions";
import io from "socket.io-client";

import Spinner from "../common/Spinner";
import Hourglass from "../common/Hourglass-spinner";
import Opponent from "./Opponent";

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
    this.surrender = this.surrender.bind(this);
  }

  componentDidMount() {
    if (!this.props.game._id) {
      this.props.history.push("/dashboard");
    } else {
      this.socket.emit("subscribe", this.props.game);

      this.socket.on("serve game", game => {
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

  surrender() {
    this.socket.emit("surrender", this.props.game);
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
    }, 500);
  }

  render() {
    const auth = this.props.auth;
    const game = this.props.game;

    const isYourTurn = game.nextPlayer === auth.user.id;
    const isOpponentsTurn = game.nextPlayer && game.nextPlayer !== auth.user.id;

    const board = (
      <div className="game-board">
        {this.state.replayBoard
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
          : null}
      </div>
    );

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
      if (isYourTurn) {
        message = "It's your turn";
      } else {
        message = "It's your opponents turn";
      }
    }

    const replayBtn = <button onClick={() => this.replay(0)}>Replay</button>;
    const leaveBtn = <button onClick={this.leaveGame}>Leave</button>;
    const surrenderBtn = <button onClick={this.surrender}>Surrender</button>;

    return (
      <div className="game-container">
        <div className="game-body">{game.isStarted ? board : <Spinner />}</div>
        <div className="game-header">
          <Opponent game={this.props.game} auth={this.props.auth} />
          <div className="info">
            <p>{message}</p>
            <div>{isOpponentsTurn ? <Hourglass /> : null}</div>
          </div>
          <div className="game-header-buttons">
            {!game.isEnded ? surrenderBtn : null}
            {game.isEnded && !this.state.isReplaying ? replayBtn : null}
            {game.isEnded && !this.state.leaveBtn ? leaveBtn : null}
          </div>
        </div>
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
