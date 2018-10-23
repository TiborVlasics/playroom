import React, { Component } from 'react'

class TicTacToe extends Component {
  render() {
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

export default TicTacToe;