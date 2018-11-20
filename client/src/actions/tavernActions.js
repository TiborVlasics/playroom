import axios from "axios";
import {
  LOAD_GAMES,
  LOAD_NEW_GAME,
  UNLOAD_GAME,
  TAVERN_LOADING,
  CLEAR_GAMES
} from "./types";

export const fetchGames = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/games/")
    .then(res => dispatch({ type: LOAD_GAMES, payload: res.data }))
    .catch(err => console.log(err));
};

export const loadNewGame = game => dispatch => {
  dispatch({ type: LOAD_NEW_GAME, payload: game });
};

export const unloadGame = game => dispatch => {
  dispatch({ type: UNLOAD_GAME, payload: game });
};

export const setLoading = () => {
  return { type: TAVERN_LOADING };
};

export const clearGames = () => {
  return { type: CLEAR_GAMES };
};
