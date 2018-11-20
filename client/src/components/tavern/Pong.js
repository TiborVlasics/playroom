import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame, setCurrentGame } from "../../actions/gameActions";
import io from "socket.io-client";

class Pong extends Component {
  constructor() {
    super();
    this.state = {
      p1y: 40,
      p2y: 40,
      pt: 10,
      ph: 100,
      bx: 50,
      by: 50,
      xv: 4,
      yv: 4,
      bd: 7,
      score1: 0,
      score2: 0,
      width: 640,
      height: 480
    };

    this.socket = io.connect(
      "/pong",
      {
        transports: ["polling", "websocket"],
        query: { token: localStorage.jwtToken }
      }
    );

    this.onMouseMove = this.onMouseMove.bind(this);
    this.clearCurrentGame = this.clearCurrentGame.bind(this);
    this.surrender = this.surrender.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentGame();

    if (!this.props.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard");
    } else {
      const c = this.refs.gc;
      const cc = c.getContext("2d");

      this.socket.on("connect", () => {
        this.socket.emit("join", this.props.game);
      });

      this.socket.on("game started", game => {
        this.props.setCurrentGame(game);
      });

      this.socket.on("game ended", game => {
        this.props.setCurrentGame(game);
      });

      this.socket.on("update", move => {
        this.setState(move);
        this.update(cc);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    this.socket.close();
    this.props.setCurrentGame({});
  }

  onMouseMove(e) {
    if (this.props.auth.user.id === this.props.game.player1.id) {
      const p1y = e.clientY - 217;
      this.setState({ p1y: p1y });
      this.socket.emit("move", {
        move: { p1y: p1y },
        id: this.props.game._id
      });
    } else if (this.props.auth.user.id === this.props.game.player2.id) {
      const p2y = e.clientY - 217;
      this.setState({ p2y: p2y });
      this.socket.emit("move", {
        move: { p2y: p2y },
        id: this.props.game._id
      });
    }
  }

  surrender() {
    this.socket.emit("surrender", this.props.game);
  }

  clearCurrentGame() {
    this.props.setCurrentGame({});
  }

  update(cc) {
    cc.fillStyle = "rgba(0, 0, 0, 0.5)";
    cc.fillRect(0, 0, this.state.width, this.state.height);
    cc.fillStyle = "white";
    cc.fillRect(0, this.state.p1y, this.state.pt, this.state.ph);

    cc.fillRect(
      this.state.width - this.state.pt,
      this.state.p2y,
      this.state.pt,
      this.state.ph
    );

    cc.fillRect(
      this.state.bx - this.state.bd / 2,
      this.state.by - this.state.bd / 2,
      this.state.bd,
      this.state.bd
    );
  }

  render() {
    const leaveBtn = <button onClick={this.clearCurrentGame}>Leave</button>;
    const surrenderBtn = <button onClick={this.surrender}>Surrender</button>;

    return (
      <div>
        <div className="pong-scores">
          <span>{this.state.score1}</span>
          <span>{this.state.score2}</span>
          {this.props.game.isEnded ? leaveBtn : surrenderBtn}
        </div>
        <canvas
          onPointerMove={this.onMouseMove}
          onMouseMove={this.onMouseMove}
          ref="gc"
          width="640"
          height="480"
        />
      </div>
    );
  }
}

Pong.propTypes = {
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
)(Pong);
