import React from "react";
import Hourglass from "../common/Hourglass-spinner";

const Info = ({ game, auth }) => {
  const isYourTurn = game.nextPlayer === auth.user.id;
  const isOpponentsTurn = game.nextPlayer && game.nextPlayer !== auth.user.id;

  let message;
  if (game.isEnded) {
    if (game.winner === null) {
      message = "It's a  draw (O_O)";
    } else if (game.winner === auth.user.id) {
      message = "You won :-D";
    } else {
      message = "Looser...";
    }
  } else {
    if (isYourTurn) {
      message = "It's your turn";
    } else {
      message = "It's your opponents turn";
    }
  }

  return (
    <div>
      <div className="spinner-container">
        {isOpponentsTurn ? <Hourglass /> : null}
      </div>
      <div className="info-message">{message}</div>
    </div>
  );
};

export default Info;
