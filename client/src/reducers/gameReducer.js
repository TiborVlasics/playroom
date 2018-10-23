import { GET_CURRENT_GAME } from "../actions/types";

export default function tavernReducer(state = null, action = {}) {
  switch (action.type) {
    case GET_CURRENT_GAME:
      return action.payload
    default:
      return state;
  }
}