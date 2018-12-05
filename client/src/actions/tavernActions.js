import axios from "axios";
import * as types from "./types";

export const fetchGames = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/games/")
    .then(res => dispatch({ type: types.LOAD_GAMES, payload: res.data }))
    .catch(err => console.log(err));
};

export const loadNewGame = game => dispatch => {
  dispatch({ type: types.LOAD_NEW_GAME, payload: game });
};

export const unloadGame = game => dispatch => {
  dispatch({ type: types.UNLOAD_GAME, payload: game });
};

export const setLoading = () => {
  return { type: types.TAVERN_LOADING };
};

export const clearGames = () => {
  return { type: types.CLEAR_GAMES };
};
