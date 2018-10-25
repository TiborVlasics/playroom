
module.exports = { mapGameStringToArray }

/**
 * 
 * @param gameString a string representing the game eg: 'xxooxooox'
 * @returns A two dimensional array representing the game
 * 
 */
function mapGameStringToArray(gameString) {
  let rows = Math.sqrt(gameString.length);
  let game = gameString.split("");

  return game.reduce((acc, currValue, index) => {
    if (index !== 0 && index % rows === 0) {
      acc = acc.concat(["currValue"]);
    } else {
      acc[acc.length - 1] = acc[acc.length - 1].concat(currValue);
    }
    return acc;
  }, [[]])
}