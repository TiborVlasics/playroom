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
import Spinner from "../common/Spinner";

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
    const tavernContent = (
      <div className="container cards">
        {this.props.tavern.isUserPlaying ? null : <NewGameForm />}
        {this.props.tavern.games.map((game, index) => (
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
                <small className="text-text">Created: {game.createdDate}</small>
              </p>
              <button className="btn btn-success">Join game</button>
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div>
        <h1>Games:</h1>
        {this.props.tavern.isLoading ? <Spinner /> : tavernContent}
      </div>
    );
  }
}

Tavern.propTypes = {
  auth: PropTypes.object.isRequired,
  tavern: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired,
  loadNewGame: PropTypes.func.isRequired,
  getUserPlaying: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tavern: state.tavern
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
