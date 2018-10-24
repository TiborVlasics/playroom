import React from 'react'

const GameList = ({ games, currentGame, joinGame }) => {
  return (
    <div>
      {games.map((game, index) => {
        let player2;
        if (game.hasOwnProperty("player2")) {
          player2 = <p className="card-text">
            player2: {game.player2.name}
            <img
              src={game.player2.avatar}
              style={{ maxWidth: "40px" }}
              alt="user avatar"
            />
          </p>
        }

        return (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: "rgba(100, 10, 10, 0.2)" }}
          >
            <div className="card-body">
              <h5 className="card-title">tictactoe</h5>
              <p className="card-text">
                player1: {game.player1.name}
                <img
                  src={game.player1.avatar}
                  style={{ maxWidth: "40px" }}
                  alt="user avatar"
                />
              </p>
              {player2}
              <h3>{game.isStarted}</h3>
              <p className="card-text">
                <small className="text-text">Created: {game.createdDate}</small>
              </p>
              <button
                className={currentGame.hasOwnProperty("_id") || game.isStarted
                  ? "btn btn-success hidden-button"
                  : "btn btn-success"}
                onClick={() => joinGame(game)}>Join game</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GameList;
