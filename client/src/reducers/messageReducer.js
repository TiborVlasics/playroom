import { ADD_MESSAGE, FETCH_MESSAGES, CLEAR_MESSAGES } from "../actions/types";
import { LOCATION_CHANGE } from "react-router-redux";

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
    case CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}
