import React from "react";

const Opponent = ({ game, auth }) => {
  const opponent =
    game.player1 && game.player1.id === auth.user.id
      ? game.player2
      : game.player1;

  return opponent ? (
    <div className="opponent">
      <p>Your opponent:</p>
      <span>{opponent.name}</span>
      <img src={opponent.avatar} alt="user avatar" />
    </div>
  ) : null;
};

export default Opponent;
