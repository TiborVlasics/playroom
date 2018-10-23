import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import tavernReducer from "./tavernReducer";
import gameReducer from "./gameReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chat: messageReducer,
  tavern: tavernReducer,
  currentGame: gameReducer
});
