import axios from "axios";
import {
  GET_ERRORS,
  LOAD_MESSAGES,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  CHAT_LOADING
} from "./types";

export const addMessage = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
  window.scrollTo(0, document.body.scrollHeight);
};

export const loadMessages = () => dispatch => {
  dispatch(setChatLoading());

  axios
    .get("/api/messages/")
    .then(res => {
      dispatch({ type: LOAD_MESSAGES, payload: res.data });
      window.scrollTo(0, document.body.scrollHeight);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setChatLoading = () => {
  return { type: CHAT_LOADING };
};

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGES });
};
