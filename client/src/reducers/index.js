import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import tavernReducer from "./tavernReducer";
import gameReducer from "./gameReducer";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chat: messageReducer,
  tavern: tavernReducer,
  currentGame: gameReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;