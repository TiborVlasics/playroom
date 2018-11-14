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
      bd: 5,
      score1: 0,
      score2: 0
    };

    this.socket = io("/pong", {
      transports: ["polling", "websockets"],
      query: { token: localStorage.jwtToken }
    });

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    const c = this.refs.gc;
    const cc = c.getContext("2d");

    this.props.getCurrentGame();

    if (!this.props.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard");
    }

    this.socket.on("connect", () => {
      this.socket.emit("ready to start", this.props.game);
    });

    this.socket.on("game started", game => {
      this.props.setCurrentGame(game);
    });

    this.socket.on("move", move => {
      this.setState(move);
    });

    if (this.props.game.isStarted === true) {
      setInterval(() => this.update(c, cc), 1000 / 30);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.game.hasOwnProperty("_id")) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onMouseMove(e) {
    if (this.props.auth.user.id === this.props.game.player1.id) {
      const p1y = e.clientY - 217;
      this.setState({ p1y: p1y });
      this.socket.emit("move", {
        coord: { p1y: p1y },
        game: this.props.game._id
      });
    } else if (this.props.auth.user.id === this.props.game.player2.id) {
      const p2y = e.clientY - 217;
      this.setState({ p2y: p2y });
      this.socket.emit("move", {
        coord: { p2y: p2y },
        game: this.props.game._id
      });
    }
  }

  reset(c) {
    this.setState({ bx: c.width / 2 });
    this.setState({ by: c.height / 2 });
    this.setState({ xv: -this.state.xv });
    this.setState({ yv: 3 });
  }

  update(c, cc) {
    this.setState({ bx: this.state.bx + this.state.xv });
    this.setState({ by: this.state.by + this.state.yv });

    if (this.state.by < 0 && this.state.yv < 0) {
      this.setState({ yv: -this.state.yv });
    }
    if (this.state.by > c.height && this.state.yv > 0) {
      this.setState({ yv: -this.state.yv });
    }
    if (this.state.bx < 0) {
      if (
        this.state.by > this.state.p1y &&
        this.state.by < this.state.p1y + this.state.ph
      ) {
        this.setState({ xv: -this.state.xv });

        const dy = this.state.by - (this.state.p1y + this.state.ph / 2);
        this.setState({ yv: dy * 0.3 });
      } else {
        this.setState({ score2: this.state.score2 + 1 });
        this.reset(c);
      }
    }
    if (this.state.bx > c.width) {
      if (
        this.state.by > this.state.p2y &&
        this.state.by < this.state.p2y + this.state.ph
      ) {
        this.setState({ xv: -this.state.xv });

        const dy = this.state.by - (this.state.p2y + this.state.ph / 2);
        this.setState({ yv: dy * 3 });
      } else {
        this.setState({ score1: this.state.score1 + 1 });
        this.reset(c);
      }
    }

    cc.fillStyle = "white";
    cc.fillRect(0, 0, c.width, c.height);
    cc.fillStyle = "black";
    cc.fillRect(0, this.state.p1y, this.state.pt, this.state.ph);
    cc.fillRect(
      c.width - this.state.pt,
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
    cc.fillText(this.state.score1, 100, 100);
    cc.fillText(this.state.score2, c.width - 100, 100);
  }

  render() {
    return (
      <div>
        <h1>helo pong</h1>
        <canvas
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
