import axios from "axios";
import { FETCH_GAMES } from "./types";

export const fetchGames = () => dispatch => {
  axios
    .get("/api/games/")
    .then(res => {
      dispatch({ type: FETCH_GAMES, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
