import React, { Component } from "react";

class NewGameForm extends Component {
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
            <button className="btn btn-danger">New Game</button>
          </form>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    );
  }
}

export default NewGameForm;
