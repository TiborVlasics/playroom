import React from "react";

const GameList = ({ games, currentGame, joinGame, deleteGame }) => {
  return (
    <div>
      {games.map((game, index) => {
        let player2;

        if (game.hasOwnProperty("player2")) {
          player2 = (
            <div className="card-player">
              {game.player2.name}
              <img src={game.player2.avatar} alt="user avatar" />
            </div>
          );
        }

        return (
          <div
            key={index}
            className={
              game.kind === "pongs" ? "card pong-card" : "card tictactoe-card"
            }
          >
            <div className="card-header">
              <h5 className="card-title">
                {game.kind === "amoebas" ? "Five-in-a-row" : "Pong"}
              </h5>
              <button
                className={
                  currentGame.hasOwnProperty("_id") || game.isFull
                    ? "btn btn-success hidden-button"
                    : "btn btn-success join-button"
                }
                onClick={() => joinGame(game)}
              >
                Join game
              </button>
              {game._id === currentGame._id ? (
                <button onClick={() => deleteGame(game)} className="btn-cancel">
                  Cancel game
                </button>
              ) : null}
            </div>
            <div className="card-body">
              <div>Players:</div>
              <div className="card-player">
                {game.player1.name}
                <img src={game.player1.avatar} alt="user avatar" />
              </div>
              {player2}
              <div className="card-created">Created: {game.createdDate}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameList;
