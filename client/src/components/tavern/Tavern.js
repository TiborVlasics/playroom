import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SocketContext from "../../SocketContext";
import {
  fetchGames,
  loadNewGame,
  getUserPlaying
} from "../../actions/tavernActions";
import NewGameForm from "./NewGameForm";

class Tavern extends Component {
  componentDidMount() {
    this.props.fetchGames();
    this.props.getUserPlaying();
    this.props.socket.on("new game", game => {
      this.props.loadNewGame(game);
      if (this.props.auth.user.id === game.player1.id) {
        this.props.getUserPlaying();
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Games:</h1>
        <div className="container cards">
          {this.props.auth.user.isPlaying ? null : <NewGameForm />}
          {this.props.games.map((game, index) => (
            <div
              key={index}
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
  fetchGames: PropTypes.func.isRequired,
  loadNewGame: PropTypes.func.isRequired,
  getUserPlaying: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  games: state.games
});

const TavernWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Tavern {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default connect(
  mapStateToProps,
  { fetchGames, loadNewGame, getUserPlaying }
)(TavernWithSocket);
