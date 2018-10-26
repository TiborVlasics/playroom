
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


module.exports = { mapGameArrayToMatrix, mapGameStringToArray, applyMove }
