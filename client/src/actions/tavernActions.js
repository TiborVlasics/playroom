import axios from "axios";
import {
  FETCH_GAMES,
  GET_ERRORS,
  LOAD_NEW_GAME,
  TAVERN_LOADING,
  CLEAR_GAMES
} from "./types";

export const fetchGames = () => dispatch => {
  dispatch(setLoading());
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

export const setLoading = () => {
  return { type: TAVERN_LOADING };
};

export const clearGames = () => {
  return { type: CLEAR_GAMES }
}
