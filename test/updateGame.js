const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { updateGame } = require("../tic-tac-toe/ticTacToe.functions");

describe("Update game (calling all 11 functions composed)", () => {
  it("Game object should remain unmutated", () => {
    const game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        name: "user",
        avatar: "https://api.adorable.io/avatars/141/user.png",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        name: "user1",
        avatar: "https://api.adorable.io/avatars/141/user1.png",
        symbol: "O"
      },
      boardState: ["?????????", "?X???????", "?X?O?????", "?XXO?????"],
      isStarted: true,
      isEnded: false,
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      move: 0,
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    };

    const updatedGame = updateGame(game);
    expect(game).to.not.have.property("gameString");
  });

  it("Should return the updated game, which is still running", () => {
    const game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        name: "user",
        avatar: "https://api.adorable.io/avatars/141/user.png",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        name: "user1",
        avatar: "https://api.adorable.io/avatars/141/user1.png",
        symbol: "O"
      },
      boardState: ["?????????", "?X???????", "?X?O?????", "?XXO?????"],
      isStarted: true,
      isEnded: false,
      nextPlayer: "5bd1cbc3e9f6ea38c32d649a",
      move: 0,
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    };
    const updatedGame = updateGame(game);
    assert.deepEqual(updatedGame, {
      isStarted: true,
      gameString: "OXXO?????",
      isEnded: false,
      move: { x: 0, y: 0 },
      nextPlayer: "5bd1cbb4e9f6ea38c32d6498",
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    });
  });

  it("Should return the updated game, which is won by player1", () => {
    const game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        name: "user",
        avatar: "https://api.adorable.io/avatars/141/user.png",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        name: "user1",
        avatar: "https://api.adorable.io/avatars/141/user1.png",
        symbol: "O"
      },
      boardState: [
        "?????????",
        "?X???????",
        "?X?O?????",
        "?XXO?????",
        "?XXOO????"
      ],
      isStarted: true,
      isEnded: false,
      nextPlayer: "5bd1cbb4e9f6ea38c32d6498",
      move: 0,
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    };
    const updatedGame = updateGame(game);
    assert.deepEqual(updatedGame, {
      isStarted: true,
      gameString: "XXXOO????",
      isEnded: true,
      move: { x: 0, y: 0 },
      nextPlayer: null,
      winner: "5bd1cbb4e9f6ea38c32d6498",
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    });
  });

  it("Should return the updated game, which result is a draw", () => {
    const game = {
      player1: {
        id: "5bd1cbb4e9f6ea38c32d6498",
        name: "user",
        avatar: "https://api.adorable.io/avatars/141/user.png",
        symbol: "X"
      },
      player2: {
        id: "5bd1cbc3e9f6ea38c32d649a",
        name: "user1",
        avatar: "https://api.adorable.io/avatars/141/user1.png",
        symbol: "O"
      },
      boardState: [
        "?????????",
        "?X???????",
        "?X?O?????",
        "?XXO?????",
        "?XX?OO???",
        "?XXXOO???",
        "OXXXOO???",
        "OXXXOOX??",
        "OXXXOOXO?"
      ],
      isStarted: true,
      isEnded: false,
      nextPlayer: "5bd1cbb4e9f6ea38c32d6498",
      move: 8,
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    };
    const updatedGame = updateGame(game);
    assert.deepEqual(updatedGame, {
      isStarted: true,
      gameString: "OXXXOOXOX",
      isEnded: true,
      move: { x: 2, y: 2 },
      nextPlayer: null,
      winner: null,
      _id: "5bd1cbbbe9f6ea38c32d6499",
      isFull: true,
      createdDate: "2018-10-25T13:57:15.810Z",
      __v: 0
    });
  });
});
