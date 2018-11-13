const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const {
  mapGameArrayToMatrix,
  mapGameStringToArray,
  applyMove,
  mapMoveToIndexes,
  checkIfGameIsADraw,
  setNextPlayer,
  mapGameArrayToString
} = require("../tic-tac-toe/ticTacToe.functions");

describe("Map game's latest state to a matrix, and include it in the returned game object", () => {
  let game;

  beforeEach(() => {
    game = { gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"] };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = mapGameArrayToMatrix(game);
    expect(game).to.not.have.property("gameMatrix");
  });

  it("Updated game should have a gameMatrix property", () => {
    const updatedGame = mapGameArrayToMatrix(game);
    expect(updatedGame).to.have.property("gameMatrix");
  });

  it("Updated game should still have a boardState property", () => {
    const updatedGame = mapGameArrayToMatrix(game);
    expect(updatedGame).to.have.property("gameArray");
  });

  it("Gamematrix property should be a matrix", () => {
    const updatedGame = mapGameArrayToMatrix(game);
    const matrix = [["O", "X", "X"], ["?", "?", "?"], ["X", "X", "X"]];
    assert.deepEqual(updatedGame.gameMatrix, matrix);
  });
});

describe("Map game's latest state to an array, and include it in the returned game object", () => {
  let game;

  beforeEach(() => {
    game = {
      boardState: ["?????????", "?X???????", "?X?O?????", "OXX???XXX"]
    };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = mapGameStringToArray(game);
    expect(game).to.not.have.property("gameArray");
  });

  it("Updated game should have a gameArray property", () => {
    const updatedGame = mapGameStringToArray(game);
    expect(updatedGame).to.have.property("gameArray");
  });

  it("Updated game should still have a boardState property", () => {
    const updatedGame = mapGameStringToArray(game);
    expect(updatedGame).to.have.property("boardState");
  });

  it("GameArray property should be an array", () => {
    const updatedGame = mapGameStringToArray(game);
    const matrix = ["O", "X", "X", "?", "?", "?", "X", "X", "X"];
    assert.deepEqual(updatedGame.gameArray, matrix);
  });
});

describe("Apply move to a game object's gameArray", () => {
  let game;

  beforeEach(() => {
    game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        symbol: "O"
      },
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"],
      move: 3
    };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = applyMove(game);
    assert.deepEqual(game.gameArray, [
      "O",
      "X",
      "X",
      "?",
      "?",
      "?",
      "X",
      "X",
      "X"
    ]);
  });

  it("Updated game should still have a nextPlayer property", () => {
    const updatedGame = applyMove(game);
    expect(updatedGame).to.have.property("nextPlayer");
  });

  it("GameArray property should be an array", () => {
    const updatedGame = applyMove(game);
    const matrix = ["O", "X", "X", "O", "?", "?", "X", "X", "X"];
    assert.deepEqual(updatedGame.gameArray, matrix);
  });
});

describe("Map move to indexes", () => {
  let game;

  beforeEach(() => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["O", "X", "X"], ["O", "?", "?"], ["X", "X", "X"]],
      move: 3
    };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = mapMoveToIndexes(game);
    assert.equal(game.move, 3);
  });

  it("Updated game should still have a nextPlayer property", () => {
    const updatedGame = mapMoveToIndexes(game);
    expect(updatedGame).to.have.property("nextPlayer");
  });

  it("Move property should be an object", () => {
    const updatedGame = mapMoveToIndexes(game);
    assert.deepEqual(updatedGame.move, { x: 1, y: 0 });
  });
});

describe("Check if a game is a draw", () => {
  let game;

  it("Game object should not be mutated", () => {
    game = {
      gameArray: ["O", "X", "O", "O", "X", "X", "X", "O", "O"],
      winner: null
    };
    const updatedGame = checkIfGameIsADraw(game);
    assert.equal(game.winner, null);
  });

  it("Game should be a draw", () => {
    game = {
      gameArray: ["O", "X", "O", "O", "X", "X", "X", "O", "O"],
      winner: null
    };
    const updatedGame = checkIfGameIsADraw(game);
    assert.equal(updatedGame.winner, null);
  });

  it("Is ended should be true", () => {
    game = {
      gameArray: ["O", "X", "O", "O", "X", "X", "X", "O", "O"],
      winner: null
    };
    const updatedGame = checkIfGameIsADraw(game);
    assert.equal(updatedGame.isEnded, true);
  });

  it("Winner should be null", () => {
    game = {
      gameArray: ["?", "X", "O", "O", "X", "X", "X", "O", "O"],
      winner: null
    };
    const updatedGame = checkIfGameIsADraw(game);
    assert.equal(updatedGame.winner, null);
  });
});

describe("Set next player when game isn't over", () => {
  let game;

  beforeEach(() => {
    game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        symbol: "O"
      },
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"],
      move: 3,
      winner: null,
      isEnded: false
    };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = setNextPlayer(game);
    assert.equal(game.nextPlayer, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Next player should be player1", () => {
    const updatedGame = setNextPlayer(game);
    assert.deepEqual(updatedGame.nextPlayer, "5bd1cbb4e9f6ea38c32d6498");
  });
});

describe("Set next player when game is over", () => {
  let game;

  beforeEach(() => {
    game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        symbol: "O"
      },
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"],
      move: 3,
      winner: "5bd1cbc3e9f6ea38c32d649a"
    };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = setNextPlayer(game);
    assert.equal(game.nextPlayer, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Next player should be null", () => {
    const updatedGame = setNextPlayer(game);
    assert.deepEqual(updatedGame.nextPlayer, null);
  });
});

describe("Map game's gameArray to a string", () => {
  let game;

  beforeEach(() => {
    game = { gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"] };
  });

  it("Game object should remain unmutated", () => {
    const updatedGame = mapGameArrayToString(game);
    expect(game).to.not.have.property("gameString");
  });

  it("GameState property should be a string of the game", () => {
    const updatedGame = mapGameArrayToString(game);
    assert.equal(updatedGame.gameString, "OXX???XXX");
  });
});
