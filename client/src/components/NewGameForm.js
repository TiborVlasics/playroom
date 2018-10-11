import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";

class NewGameForm extends Component {
  constructor() {
    super();
    this.state = {
      game: "tictactoe"
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.socket = io("/", { transports: ["polling"] });
  }

  onSubmit(event) {
    event.preventDefault();
    this.socket.emit("new game", {
      game: this.state.game,
      user: this.props.auth.user
    });
  }

  render() {
    return (
      <div
        className="card new-card"
        style={{ backgroundColor: "rgba(100, 100, 10, 0.2)", marginTop: 10 }}
      >
        <div className="card-body">
          <h5 className="card-title">New Game</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <form onSubmit={this.onSubmit}>
            <select name="game" class="form-control">
              <option>Tictactoe</option>
            </select>
            <button className="btn btn-danger btn-sm mt-2">New Game</button>
          </form>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
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
