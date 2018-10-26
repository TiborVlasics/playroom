const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { mapGameArrayToMatrix, mapGameStringToArray } = require("../helper/ticTacToe.helper");

describe("Map game's latest state to a matrix, and include it in the returned game object", function () {

  let game;

  beforeEach(() => {
    game = {
      gameArray: ["O", "X", "X", "?", "?", "?", "X", "X", "X"]
    }
  })

  it('Game object should remain unmutated',
    () => {
      const updatedGame = mapGameArrayToMatrix(game)
      expect(game).to.not.have.property("gameMatrix")
    });

  it('Updated game should have a gameMatrix property',
    () => {
      const updatedGame = mapGameArrayToMatrix(game)
      expect(updatedGame).to.have.property("gameMatrix")
    });

  it('Updated game should still have a boardState property',
    () => {
      const updatedGame = mapGameArrayToMatrix(game)
      expect(updatedGame).to.have.property("gameArray")
    });

  it("Gamematrix property should be a matrix",
    () => {
      const updatedGame = mapGameArrayToMatrix(game)
      const matrix = [["O", "X", "X"], ["?", "?", "?"], ["X", "X", "X"]]
      assert.deepEqual(updatedGame.gameMatrix, matrix);
    });
});


describe("Map game's latest state to an array, and include it in the returned game object", function () {

  let game;

  beforeEach(() => {
    game = {
      boardState: ['?????????',
        '?X???????',
        '?X?O?????',
        'OXX???XXX']
    }
  })

  it('Game object should remain unmutated',
    () => {
      const updatedGame = mapGameStringToArray(game)
      expect(game).to.not.have.property("gameArray")
    });

  it('Updated game should have a gameArray property',
    () => {
      const updatedGame = mapGameStringToArray(game)
      expect(updatedGame).to.have.property("gameArray")
    });

  it('Updated game should still have a boardState property',
    () => {
      const updatedGame = mapGameStringToArray(game)
      expect(updatedGame).to.have.property("boardState")
    });

  it("GameArray property should be an array",
    () => {
      const updatedGame = mapGameStringToArray(game)
      const matrix = ["O", "X", "X", "?", "?", "?", "X", "X", "X"]
      assert.deepEqual(updatedGame.gameArray, matrix);
    });
});