const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { mapGameStringToMatrix } = require("../helper/ticTacToe.helper");

describe("Map game's latest state to a matrix, and include it in the returned game object", function () {

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
      const updatedGame = mapGameStringToMatrix(game)
      expect(game).to.not.have.property("gameMatrix")
    });

  it('Updated game should have a gameMatrix property',
    () => {
      const updatedGame = mapGameStringToMatrix(game)
      expect(updatedGame).to.have.property("gameMatrix")
    });

  it('Updated game should still have a boardState property',
    () => {
      const updatedGame = mapGameStringToMatrix(game)
      expect(updatedGame).to.have.property("boardState")
    });

  it('GameMatrix should have a length of 3',
    () => {
      const updatedGame = mapGameStringToMatrix(game)
      assert.equal(updatedGame.gameMatrix.length, 3);
    });

  it("A 9 character string should be mapped to a matrix with the first row of 3 x's",
    () => {
      const updatedGame = mapGameStringToMatrix(game)
      assert.deepEqual(updatedGame.gameMatrix[0], ["O", "X", "X"]);
    });

  it("A 9 character string should be mapped to a matrix with the last row of 3 x's",
    () => {
      const updatedGame = mapGameStringToMatrix(game)
      assert.deepEqual(updatedGame.gameMatrix[2], ["X", "X", "X"]);
    });
});
