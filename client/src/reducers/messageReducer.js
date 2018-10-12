import {
  ADD_MESSAGE,
  LOAD_MESSAGES,
  CLEAR_MESSAGES,
  CHAT_LOADING
} from "../actions/types";

const initialState = {
  loading: false,
  messages: []
};

export default function messageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHAT_LOADING:
      return { ...state, loading: true, messages: [] };
    case LOAD_MESSAGES:
      return { ...state, messages: action.payload, loading: false };
    case ADD_MESSAGE:
      if (state[state.length - 1]._id === action.payload._id) {
        return state.slice(0, state.length - 1).concat(action.payload);
      } else {
        return state.concat([action.payload]);
      }
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
