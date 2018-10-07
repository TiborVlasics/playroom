import { ADD_MESSAGE, FETCH_MESSAGES } from "../actions/types";

export default function messageReducer(state = [], action = {}) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      if (state[state.length - 1]._id === action.payload._id) {
        return state.slice(0, state.length - 1).concat(action.payload);
      } else {
        return state.concat([action.payload]);
      }
    default:
      return state;
  }
}
