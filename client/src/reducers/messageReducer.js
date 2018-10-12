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
      if (
        state.messages.length !== 0 &&
        state.messages[state.messages.length - 1]._id === action.payload._id
      ) {
        return {
          ...state,
          messages: state.messages
            .slice(0, state.messages.length - 1)
            .concat(action.payload)
        };
      } else {
        return { ...state, messages: state.messages.concat([action.payload]) };
      }
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
