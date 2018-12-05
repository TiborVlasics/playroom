function initGame(games, game, intervals, io) {
  if (!games[game._id]) {
    games[game._id] = {
      p1y: 40,
      p2y: 40,
      pt: 10,
      ph: 100,
      bx: 50,
      by: 50,
      xv: 4,
      yv: 4,
      bd: 7,
      score1: 0,
      score2: 0,
      width: 640,
      height: 480
    };
  }
  if (!intervals[game._id]) {
    intervals[game._id] = setInterval(() => {
      updateGame(games[game._id]);
      io.to(game._id).emit("update", games[game._id]);
    }, 1000 / 40);
  }
}

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

module.exports = { initGame };
