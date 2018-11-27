import React from "react";

const Square = ({ game, auth, value, index, move }) => {
  const renderedValue = value === "?" ? null : value;

  if (game.nextPlayer === auth.user.id && value === "?") {
    return <div onClick={() => move(game, index)}>{renderedValue}</div>;
  } else {
    return <div>{renderedValue}</div>;
  }
};

export default Square;
