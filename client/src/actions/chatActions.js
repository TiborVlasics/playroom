import axios from "axios";
import {
  LOAD_MESSAGES,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  CHAT_LOADING
} from "./types";

export const addMessage = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
};

export const loadMessages = skip => dispatch => {
  dispatch(setChatLoading());

  axios
    .get(`/api/messages/${skip}`)
    .then(res => {
      dispatch({ type: LOAD_MESSAGES, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const setChatLoading = () => {
  return { type: CHAT_LOADING };
};

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGES });
};
