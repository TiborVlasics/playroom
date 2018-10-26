
const mapGameStringToArray = (game) => {
  const gameString = game.boardState[game.boardState.length - 1];
  const gameArray = gameString.split("");

  return { ...game, gameArray: gameArray }
}

const applyMove = (game) => {
  const gameArray = game.gameArray.slice();
  if (game.player1.id === game.nextPlayer) {
    gameArray[game.move] = game.player1.symbol;
  } else {
    gameArray[game.move] = game.player2.symbol;
  }
  return { ...game, gameArray: gameArray }
}

const mapGameArrayToMatrix = (game) => {
  const rows = Math.sqrt(game.gameArray.length);
  const gameMatrix = game.gameArray.reduce((acc, currValue, index) => {
    if (index !== 0 && index % rows === 0) {
      return [...acc, [currValue]]
    } else {
      acc[acc.length - 1] = acc[acc.length - 1].concat(currValue);
    }
    return acc;
  }, [[]])

  return { ...game, gameMatrix: gameMatrix }
}

const mapMoveToIndexes = (game) => {
  count = 0
  for (let i = 0; i < game.gameMatrix.length; i++) {
    for (let j = 0; j < game.gameMatrix[i].length; j++) {
      if (count === game.move) {
        return { ...game, move: { x: i, y: j } }
      }
      ++count;
    }
  }
}

function evaluateGame(game) {
  const move = game.move;
  const matrix = game.gameMatrix;
  const symbol = matrix[move.x][move.y]

  for (let i = 0; i < 3; i++) {
    try {
      if (matrix[move.x + 2 - i][move.y] === symbol
        && matrix[move.x + 1 - i][move.y] === symbol
        && matrix[move.x - i][move.y] === symbol) {
        return { ...game, winner: game.nextPlayer }
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (matrix[move.x + 2 - i][move.y - 2 + i] === symbol
        && matrix[move.x + 1 - i][move.y - 1 + i] === symbol
        && matrix[move.x - i][move.y + i] === symbol) {
        return { ...game, winner: nextPlayer }
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (matrix[move.x][move.y - 2 + i] === symbol
        && matrix[move.x][move.y - 1 + i] === symbol
        && matrix[move.x][move.y + i] === symbol) {
        return { ...game, winner: nextPlayer }
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (matrix[move.x - 2 + i][move.y - 2 + i] === symbol
        && matrix[move.x - 1 + i][move.y - 1 + i] === symbol
        && matrix[move.x + i][move.y + i] === symbol) {
        return { ...game, winner: nextPlayer }
      }
    } catch (err) {
      continue;
    }
  }
  return { ...game }
}

module.exports = {
  mapGameArrayToMatrix,
  mapGameStringToArray,
  applyMove,
  mapMoveToIndexes,
  evaluateGame
}
