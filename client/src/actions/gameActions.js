import axios from "axios";
import { GET_CURRENT_GAME } from "./types"

export const getCurrentGame = () => dispatch => {
  axios
    .get("/api/user/current")
    .then(res => {
      if (res.data.currentGame == null) {
        dispatch({ type: GET_CURRENT_GAME, payload: res.data.currentGame });
      } else {
        axios
          .get(`/api/games/${res.data.currentGame}`)
          .then(res => {
            dispatch({ type: GET_CURRENT_GAME, payload: res.data });
          })
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
};