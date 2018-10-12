import { FETCH_GAMES, LOAD_NEW_GAME } from "../actions/types";

export default function tavernReducer(state = [], action = {}) {
  switch (action.type) {
    case FETCH_GAMES:
      return action.payload;
    case LOAD_NEW_GAME:
      return state.concat(action.payload);
    default:
      return state;
  }
}
