const chai = require("chai");
const assert = chai.assert;

const ticTacToeHelper = require("../helper/ticTacToe.helper");

describe('Map game string to two dimensional array', function () {
  it('A 9 character string should be mapped to a matrix with the length of 3', () => {
    const gameString = "xxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.equal(game.length, 3);
  });

  it('A 16 character string should be mapped to a matrix with the length of 4', () => {
    const gameString = "xxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.equal(game.length, 4);
  });

  it('A 25 character string should be mapped to a matrix with the length of 5', () => {
    const gameString = "xxxxxxxxxxxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.equal(game.length, 5);
  });

  it('A 32 character string should be mapped to a matrix with the length of 6', () => {
    const gameString = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.equal(game.length, 6);
  });

  it("A 9 character string should be mapped to a matrix with the first item of 3 x's", () => {
    const gameString = "xxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.deepEqual(game[0], ["x", "x", "x"]);
  });

  it("A 16 character string should be mapped to a matrix with the first item of 4 x's", () => {
    const gameString = "xxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.deepEqual(game[0], ["x", "x", "x", "x"]);
  });

  it("A 25 character string should be mapped to a matrix with the first item of 5 x's", () => {
    const gameString = "xxxxxxxxxxxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.deepEqual(game[0], ["x", "x", "x", "x", "x"]);
  });

  it("A 32 character string should be mapped to a matrix with the first item of 6 x's", () => {
    const gameString = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const game = ticTacToeHelper.mapGameStringToArray(gameString)
    assert.deepEqual(game[0], ["x", "x", "x", "x", "x", "x"]);
  });
});