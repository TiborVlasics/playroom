
const mapGameStringToArray = (game) => {
  const gameString = game.boardState[game.boardState.length - 1];
  const gameArray = gameString.split("");

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


module.exports = { mapGameArrayToMatrix, mapGameStringToArray }
