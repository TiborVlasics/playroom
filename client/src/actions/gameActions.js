import axios from "axios";
import { SET_CURRENT_GAME } from "./types"

export const getCurrentGame = () => dispatch => {
  axios
    .get("/api/user/current")
    .then(res => {
      if (res.data.currentGame === null) {
        setCurrentGame({})
      } else {
        axios
          .get(`/api/games/${res.data.currentGame}`)
          .then(resp => {
            console.log(resp.data)
            dispatch(setCurrentGame(resp.data))
          })
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
};

export const setCurrentGame = game => {
  return {
    type: SET_CURRENT_GAME,
    payload: game
  }
}
