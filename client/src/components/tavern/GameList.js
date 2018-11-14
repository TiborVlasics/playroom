import React from "react";

const GameList = ({ games, currentGame, joinGame, deleteGame }) => {
  return (
    <div>
      {games.map((game, index) => {
        let player2;

        if (game.hasOwnProperty("player2")) {
          player2 = (
            <p className="card-text">
              player2: {game.player2.name}
              <img
                src={game.player2.avatar}
                style={{ maxWidth: "40px" }}
                alt="user avatar"
              />
            </p>
          );
        }

        return (
          <div
            key={index}
            className={game.kind === "pongs" ? "card pong" : "card tictactoe"}
          >
            <div className="card-header">
              {game._id === currentGame._id ? (
                <button
                  onClick={() => deleteGame(game)}
                  className="btn btn-danger"
                  style={{ fontSize: "20px", float: "right" }}
                >
                  &times;
                </button>
              ) : null}
              <h5 className="card-title">{game.kind}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                player1: {game.player1.name}
                <img
                  src={game.player1.avatar}
                  style={{
                    maxWidth: "40px",
                    borderRadius: "100%",
                    marginLeft: "10px"
                  }}
                  alt="user avatar"
                />
              </p>
              {player2}
              <h3>{game.isFull}</h3>
              <p className="card-text">
                <small className="text-text">Created: {game.createdDate}</small>
              </p>
              <button
                className={
                  currentGame.hasOwnProperty("_id") || game.isFull
                    ? "btn btn-success hidden-button"
                    : "btn btn-success"
                }
                onClick={() => joinGame(game)}
              >
                Join game
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameList;
