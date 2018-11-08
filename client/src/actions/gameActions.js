import axios from "axios";
import { SET_CURRENT_GAME } from "./types"

export const getCurrentGame = () => dispatch => {
  axios.get("/api/user/current")
    .then(res => {
      if (res.data.currentGame === null) {
        dispatch(setCurrentGame({}))
      } else {
        axios.get(`/api/games/${res.data.currentGame}`)
          .then(resp => dispatch(setCurrentGame(resp.data)))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
};

export const setCurrentGame = game => dispatch => {
  return dispatch({
    type: SET_CURRENT_GAME,
    payload: game
  })
}
