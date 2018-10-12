import axios from "axios";
import {
  FETCH_GAMES,
  GET_ERRORS,
  LOAD_NEW_GAME,
  GET_USER_PLAYING
} from "./types";

export const fetchGames = () => dispatch => {
  axios
    .get("/api/games/")
    .then(res => {
      dispatch({ type: FETCH_GAMES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loadNewGame = game => dispatch => {
  dispatch({ type: LOAD_NEW_GAME, payload: game });
};

export const getUserPlaying = () => dispatch => {
  axios
    .get("/api/user/current")
    .then(res => {
      dispatch({ type: GET_USER_PLAYING, payload: res.data.isPlaying });
    })
    .catch(err => console.log(err));
};
