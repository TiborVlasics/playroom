const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { evaluateTicTacToe } = require("../app/games/amoeba/functions");

describe("Evaluate game", () => {
  it("Game object should not be mutated", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "X", "?"], ["?", "X", "?"], ["?", "X", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(game.winner, null);
  });

  it("Updated game should have gameMatrix property", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "X", "?"], ["?", "X", "?"], ["?", "X", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    expect(updatedGame).to.have.property("gameMatrix");
  });

  it("Winner should be 'nextPlayer'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "X", "?"], ["?", "X", "?"], ["?", "X", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Winner should be 'nextPlayer'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["X", "?", "?"], ["X", "?", "?"], ["X", "?", "?"]],
      move: { x: 1, y: 0 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Winner should be 'nextPlayer'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "?", "X"], ["?", "X", "?"], ["X", "?", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Winner should be 'nextPlayer'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["X", "?", "?"], ["?", "X", "?"], ["?", "?", "X"]],
      move: { x: 2, y: 2 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Winner should be 'nextPlayer'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["X", "X", "X"], ["?", "?", "?"], ["?", "?", "?"]],
      move: { x: 0, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, "5bd1cbc3e9f6ea38c32d649a");
  });

  it("Is ended should be 'true'", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "X", "?"], ["?", "X", "?"], ["?", "X", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.isEnded, true);
  });

  it("Winner should be null", () => {
    game = {
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      gameMatrix: [["?", "X", "?"], ["?", "X", "?"], ["?", "O", "?"]],
      move: { x: 1, y: 1 },
      winner: null
    };
    const updatedGame = evaluateTicTacToe(game);
    assert.equal(updatedGame.winner, null);
  });
});
