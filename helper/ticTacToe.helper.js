
const mapGameStringToMatrix = (game) => {
  const gameString = game.boardState[game.boardState.length - 1];
  const rows = Math.sqrt(gameString.length);
  const gameArray = gameString.split("");
  const gameMatrix = gameArray.reduce((acc, currValue, index) => {
    if (index !== 0 && index % rows === 0) {
      return [...acc, [currValue]]
    } else {
      acc[acc.length - 1] = acc[acc.length - 1].concat(currValue);
    }
    return acc;
  }, [[]])

  return { ...game, gameMatrix: gameMatrix }
}

module.exports = { mapGameStringToMatrix }
