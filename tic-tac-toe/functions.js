const mapGameStringToArray = game => {
  const gameString = game.boardState[game.boardState.length - 1];
  const gameArray = gameString.split("");

  return { ...game, gameArray: gameArray };
};

const applyMove = game => {
  const gameArray = game.gameArray.slice();

  if (game.player1.id === game.nextPlayer) {
    gameArray[game.move] = game.player1.symbol;
  } else {
    gameArray[game.move] = game.player2.symbol;
  }

  return { ...game, gameArray: gameArray };
};

const mapGameArrayToMatrix = game => {
  const rows = Math.sqrt(game.gameArray.length);
  const gameMatrix = game.gameArray.reduce(
    (acc, currValue, index) => {
      if (index !== 0 && index % rows === 0) {
        return [...acc, [currValue]];
      } else {
        acc[acc.length - 1] = acc[acc.length - 1].concat(currValue);
      }
      return acc;
    },
    [[]]
  );

  return { ...game, gameMatrix: gameMatrix };
};

const mapMoveToIndexes = game => {
  let count = 0;

  for (let i = 0; i < game.gameMatrix.length; i++) {
    for (let j = 0; j < game.gameMatrix[i].length; j++) {
      if (count === game.move) {
        return { ...game, move: { x: i, y: j } };
      }
      ++count;
    }
  }
};

const evaluateGame = game => {
  const move = game.move;
  const matrix = game.gameMatrix;
  const symbol = matrix[move.x][move.y];

  for (let i = 0; i < 3; i++) {
    try {
      if (
        matrix[move.x + 2 - i][move.y] === symbol &&
        matrix[move.x + 1 - i][move.y] === symbol &&
        matrix[move.x - i][move.y] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (
        matrix[move.x + 2 - i][move.y - 2 + i] === symbol &&
        matrix[move.x + 1 - i][move.y - 1 + i] === symbol &&
        matrix[move.x - i][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (
        matrix[move.x][move.y - 2 + i] === symbol &&
        matrix[move.x][move.y - 1 + i] === symbol &&
        matrix[move.x][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (
        matrix[move.x - 2 + i][move.y - 2 + i] === symbol &&
        matrix[move.x - 1 + i][move.y - 1 + i] === symbol &&
        matrix[move.x + i][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  return { ...game };
};

/**
 *
 * @param {*} game Gomoku game, where 5
 */
const evaluateGomoku = game => {
  const move = game.move;
  const matrix = game.gameMatrix;
  const symbol = matrix[move.x][move.y];

  for (let i = 0; i < 5; i++) {
    try {
      if (
        matrix[move.x + 4 - i][move.y] === symbol &&
        matrix[move.x + 3 - i][move.y] === symbol &&
        matrix[move.x + 2 - i][move.y] === symbol &&
        matrix[move.x + 1 - i][move.y] === symbol &&
        matrix[move.x - i][move.y] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 5; i++) {
    try {
      if (
        matrix[move.x + 4 - i][move.y - 4 + i] === symbol &&
        matrix[move.x + 3 - i][move.y - 3 + i] === symbol &&
        matrix[move.x + 2 - i][move.y - 2 + i] === symbol &&
        matrix[move.x + 1 - i][move.y - 1 + i] === symbol &&
        matrix[move.x - i][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 5; i++) {
    try {
      if (
        matrix[move.x][move.y - 4 + i] === symbol &&
        matrix[move.x][move.y - 3 + i] === symbol &&
        matrix[move.x][move.y - 2 + i] === symbol &&
        matrix[move.x][move.y - 1 + i] === symbol &&
        matrix[move.x][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < 5; i++) {
    try {
      if (
        matrix[move.x - 4 + i][move.y - 4 + i] === symbol &&
        matrix[move.x - 3 + i][move.y - 3 + i] === symbol &&
        matrix[move.x - 2 + i][move.y - 2 + i] === symbol &&
        matrix[move.x - 1 + i][move.y - 1 + i] === symbol &&
        matrix[move.x + i][move.y + i] === symbol
      ) {
        return { ...game, winner: game.nextPlayer, isEnded: true };
      }
    } catch (err) {
      continue;
    }
  }

  return { ...game };
};

const checkIfGameIsADraw = game => {
  if (game.winner === null) {
    if (game.gameArray.some(symbol => symbol === "?")) {
      return { ...game };
    } else {
      return { ...game, winner: null, isEnded: true };
    }
  } else {
    return { ...game };
  }
};

const setNextPlayer = game => {
  if (!game.isEnded) {
    if (game.player1.id === game.nextPlayer) {
      return { ...game, nextPlayer: game.player2.id };
    } else {
      return { ...game, nextPlayer: game.player1.id };
    }
  } else {
    return { ...game, nextPlayer: null };
  }
};

const mapGameArrayToString = game => {
  const gameState = game.gameArray.join("");

  return { ...game, gameString: gameState };
};

const removeGameArrayAndMatrixFromGameObject = game => {
  const { gameMatrix: omit, gameArray: omit1, ...gameWithoutArrays } = game;

  return gameWithoutArrays;
};

const removePlayersFromGameObject = game => {
  const { player1: omit, player2: omit1, ...gameWithoutPlayers } = game;

  return gameWithoutPlayers;
};

const addGameStringToBoardState = game => {
  const newBoardState = game.boardState.concat(game.gameString);

  return { ...game, boardState: newBoardState };
};

const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

/**
 * @desc Composing tictactoe evaluator functions together, and they get called
 * with the value returned by the previous function. The first get called
 * with an initial game parameter
 * @returns a new function awaiting a Game object as param
 */
const calculate = compose(
  mapGameStringToArray,
  applyMove,
  mapGameArrayToMatrix,
  mapMoveToIndexes,
  evaluateGomoku,
  checkIfGameIsADraw,
  setNextPlayer,
  mapGameArrayToString,
  removeGameArrayAndMatrixFromGameObject,
  removePlayersFromGameObject,
  addGameStringToBoardState
);

module.exports = {
  mapGameStringToArray,
  applyMove,
  mapGameArrayToMatrix,
  mapMoveToIndexes,
  evaluateGame,
  checkIfGameIsADraw,
  setNextPlayer,
  mapGameArrayToString,
  removeGameArrayAndMatrixFromGameObject,
  removePlayersFromGameObject,
  addGameStringToBoardState,
  calculate
};
