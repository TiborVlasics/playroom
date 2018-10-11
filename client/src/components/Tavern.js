import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGames } from "../actions/tavernActions";

import NewGameForm from "./NewGameForm";

class Tavern extends Component {
  render() {
    return (
      <div class="container cards">
        <NewGameForm />
        <div>
          <div>Games:</div>
        </div>
      </div>
    );
  }
}

Tavern.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchGames }
)(Tavern);
