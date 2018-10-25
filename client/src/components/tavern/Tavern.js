import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import { fetchGames, loadNewGame, clearGames } from "../../actions/tavernActions";
import { setCurrentGame } from "../../actions/gameActions"

import Spinner from "../common/Spinner";
import NewGameForm from "./NewGameForm";
import GameList from "./GameList"

class Tavern extends Component {
  constructor() {
    super();
    this.socket = io("/tavern", {
      transports: ["polling"],
      query: { token: localStorage.jwtToken }
    });

    this.joinGame = this.joinGame.bind(this)
  }

  pushUserToGame(game) {
    if (game.hasOwnProperty("_id") && game.isFull) {
      this.props.history.push(`/tictactoe/${game._id}`);
    }
  }

  componentDidMount() {
    this.pushUserToGame(this.props.currentGame);
    this.props.fetchGames();

    this.socket.on("new game", game => {
      this.props.loadNewGame(game);
      if (this.props.auth.user.id === game.player1.id) {
        this.props.setCurrentGame(game);
      }
    });

    this.socket.on("game is ready to start", game => {
      this.props.setCurrentGame(game)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.pushUserToGame(nextProps.currentGame)
  }

  componentWillUnmount() {
    this.props.clearGames();
    this.socket.close();
  }

  joinGame(game) {
    this.socket.emit("join game", game)
  }

  render() {
    const tavernContent = (
      <div className="container cards">
        {this.props.currentGame.hasOwnProperty("_id")
          ? null
          : (<NewGameForm socket={this.socket} />)
        }
        <GameList
          games={this.props.tavern.games}
          joinGame={this.joinGame}
          currentGame={this.props.currentGame}
        />
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
  { fetchGames, loadNewGame, setCurrentGame, clearGames }
)(Tavern);
