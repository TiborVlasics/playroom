import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import tavernReducer from "./tavernReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chat: messageReducer,
  games: tavernReducer
});
