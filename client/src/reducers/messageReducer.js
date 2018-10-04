import { ADD_MESSAGE, FETCH_MESSAGES } from "../actions/types";

export default function messageReducer(state = [], action = {}) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      return state.concat([action.payload]);
    default:
      return state;
  }
}
