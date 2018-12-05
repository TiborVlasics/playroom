import * as types from "../actions/types";

const initialState = {
  loading: false,
  messages: []
};

export default function messageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHAT_LOADING:
      return { ...state, loading: true };
    case types.LOAD_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
        loading: false
      };
    case types.ADD_MESSAGE:
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
    case types.CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
