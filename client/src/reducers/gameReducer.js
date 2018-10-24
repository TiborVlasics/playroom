import { SET_CURRENT_GAME } from "../actions/types";

export default function tavernReducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_CURRENT_GAME:
      return action.payload
    default:
      return state;
  }
}