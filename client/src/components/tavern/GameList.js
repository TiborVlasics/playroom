import React from 'react'

const GameList = ({ games, currentGame, joinGame }) => {
  return (
    <div>
      {games.map((game, index) => (
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
            <button
              className={currentGame
                ? "btn btn-success hidden-button"
                : "btn btn-success"}
              onClick={() => joinGame(game)}>Join game</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameList;
