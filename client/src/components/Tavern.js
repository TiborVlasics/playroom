import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGames } from "../actions/tavernActions";

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
          <div>Games:</div>
          {this.props.games.map(game => (
            <div>{game._id}</div>
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
