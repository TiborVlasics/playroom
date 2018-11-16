import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NewGameForm extends Component {
  constructor() {
    super();
    this.state = {
      game: "tictactoe"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ game: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.socket.emit("create game", this.state.game);
  }

  render() {
    return (
      <div
        className="card new-game-card"
        style={{ backgroundColor: "rgba(100, 100, 10, 0.2)", marginTop: 10 }}
      >
        <div className="card-body">
          <h5 className="card-title">New Game</h5>
          <form onSubmit={this.onSubmit}>
            <select
              value={this.state.game}
              onChange={this.onChange}
              name="game"
              className="form-control"
            >
              <option value="tictactoe">Tic-tac-toe</option>
              <option value="pong">Pong</option>
            </select>
            <button className="btn btn-danger btn-sm mt-2">New Game</button>
          </form>
        </div>
      </div>
    );
  }
}

NewGameForm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(NewGameForm);
