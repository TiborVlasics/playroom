import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchGames,
  loadNewGame,
  unloadGame,
  clearGames
} from "../../actions/tavernActions";
import { setCurrentGame } from "../../actions/gameActions";

import Spinner from "../common/Spinner";
import NewGameForm from "./NewGameForm";
import GameList from "./GameList";

class Tavern extends Component {
  constructor() {
    super();

    this.joinGame = this.joinGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchGames();

    this.props.socket.on("create game", game => {
      this.props.loadNewGame(game);
      if (this.props.auth.user.id === game.player1.id) {
        this.props.setCurrentGame(game);
      }
    });

    this.props.socket.on("unload game", game => {
      this.props.unloadGame(game);
      this.props.setCurrentGame({});
    });

    this.props.socket.on("game ready", game => {
      this.props.setCurrentGame(game);
    });

    this.props.socket.on("game started", game => {
      this.props.fetchGames();
    });
  }

  componentWillUnmount() {
    const game = this.props.currentGame;
    if (game && !game.isFull) {
      this.deleteGame(game);
    }
    this.props.clearGames();
  }

  joinGame(game) {
    this.props.socket.emit("join game", game);
  }

  deleteGame(game) {
    this.props.socket.emit("delete game", game);
  }

  render() {
    const tavernContent = (
      <div className="cards">
        {this.props.currentGame.hasOwnProperty("_id") ? null : (
          <NewGameForm socket={this.props.socket} />
        )}
        <GameList
          games={this.props.tavern.games}
          joinGame={this.joinGame}
          deleteGame={this.deleteGame}
          currentGame={this.props.currentGame}
        />
      </div>
    );

    return (
      <div className="games">
        {this.props.tavern.isLoading ? <Spinner /> : tavernContent}
      </div>
    );
  }
}

Tavern.propTypes = {
  auth: PropTypes.object.isRequired,
  tavern: PropTypes.object.isRequired,
  currentGame: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired,
  loadNewGame: PropTypes.func.isRequired,
  unloadGame: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired,
  clearGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tavern: state.tavern,
  currentGame: state.currentGame
});

export default connect(
  mapStateToProps,
  { fetchGames, loadNewGame, setCurrentGame, clearGames, unloadGame }
)(Tavern);
