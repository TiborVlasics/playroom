import React from "react";
import Square from "./Square";

export default function Board({ replayBoard, game, auth, move }) {
  return (
    <div className="game-board">
      {replayBoard
        ? replayBoard
            .split("")
            .map(value => <div>{value !== "?" ? value : null}</div>)
        : game.isStarted
        ? game.boardState[game.boardState.length - 1]
            .split("")
            .map((value, index) => (
              <Square
                key={index}
                game={game}
                auth={auth}
                value={value}
                index={index}
                move={move}
              />
            ))
        : null}
    </div>
  );
}
