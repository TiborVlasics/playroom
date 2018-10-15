import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NewGameForm extends Component {
  constructor() {
    super();
    this.state = {
      game: "tictactoe"
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.socket.emit("new game", {
      game: this.state.game,
      user: this.props.auth.user
    });
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
            <select name="game" className="form-control">
              <option>Tictactoe</option>
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
