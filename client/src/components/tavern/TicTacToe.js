import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentGame } from "../../actions/gameActions";

class TicTacToe extends Component {


  componentWillMount() {
    this.props.getCurrentGame();
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    // console.log(this.props.tavern.currentGame)

    return (
      <div className="tic-tac-toe">
        <h1>TicTacToe</h1>
        <div className="game-board">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>
      </div>
    )
  }
}

TicTacToe.propTypes = {
  auth: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  getCurrentGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.currentGame
});

export default connect(mapStateToProps, { getCurrentGame })(TicTacToe);