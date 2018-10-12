import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGames } from "../../actions/tavernActions";

import NewGameForm from "./NewGameForm";

class Tavern extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="container cards">
        <NewGameForm />
        <div>
          <h1>Games:</h1>
          {this.props.games.map(game => (
            <div
              key={game._id}
              className="card"
              style={{ backgroundColor: "rgba(100, 10, 10, 0.2)" }}
            >
              <div className="card-body">
                <h5 className="card-title">{game.player1.name}</h5>
                <p className="card-text">
                  New tictactoe game, created by {game.player1.name},{" "}
                  <img
                    src={game.player1.avatar}
                    style={{ maxWidth: "70px" }}
                    alt="user avatar"
                  />
                </p>
                <h3>{game.isStarted}</h3>
                <p className="card-text">
                  <small className="text-text">
                    Created: {game.createdDate}
                  </small>
                </p>
                <button className="btn btn-success">Join game</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Tavern.propTypes = {
  auth: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  games: state.games
});

export default connect(
  mapStateToProps,
  { fetchGames }
)(Tavern);
