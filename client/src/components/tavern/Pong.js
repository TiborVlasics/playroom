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
      // ais: 2,
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

    setInterval(() => this.update(c, cc), 1000 / 30);
  }

  onMouseMove(e) {
    this.setState({ p1y: e.clientY - 217 });
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
    // // AI  move
    // if (this.state.p2y + this.state.ph / 2 < this.state.by) {
    //   this.setState({ p2y: this.state.p2y + this.state.ais });
    // } else {
    //   this.setState({ p2y: this.state.p2y - this.state.ais });
    // }

    cc.fillStyle = "black";
    cc.fillRect(0, 0, c.width, c.height);
    cc.fillStyle = "white";
    // player1
    cc.fillRect(0, this.state.p1y, this.state.pt, this.state.ph);
    // player2
    cc.fillRect(
      c.width - this.state.pt,
      this.state.p2y,
      this.state.pt,
      this.state.ph
    );
    // ball
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
