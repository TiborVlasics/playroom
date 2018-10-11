import { FETCH_GAMES } from "../actions/types";

export default function tavernReducer(state = [], action = {}) {
  switch (action.type) {
    case FETCH_GAMES:
      return action.payload;
    default:
      return state;
  }
}
