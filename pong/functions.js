function updateGame(game) {
  game.bx = game.bx + game.xv;
  game.by = game.by + game.yv;

  if (game.by < 0 && game.yv < 0) {
    game.yv = -game.yv;
  }
  if (game.by > game.height && game.yv > 0) {
    game.yv = -game.yv;
  }
  if (game.bx < 0) {
    if (game.by > game.p1y && game.by < game.p1y + game.ph) {
      game.xv = -game.xv;
      const dy = game.by - (game.p1y + game.ph / 2);
      game.yv = dy * 0.3;
    } else {
      game.score2 = game.score2 + 1;
      game.bx = 320;
      game.by = 240;
      game.xv = -4;
      game.yv = 4;
    }
  }
  if (game.bx > game.width) {
    if (game.by > game.p2y && game.by < game.p2y + game.ph) {
      game.xv = -game.xv;
      const dy = game.by - (game.p2y + game.ph / 2);
      game.yv = dy * 0.3;
    } else {
      game.score1 = game.score1 + 1;
      game.bx = 320;
      game.by = 240;
      game.xv = 4;
      game.yv = 4;
    }
  }
}

module.exports = { updateGame, initGame, deleteGame };
