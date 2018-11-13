import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, SET_USER_HISTORY } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  history: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_USER_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    default:
      return state;
  }
}
