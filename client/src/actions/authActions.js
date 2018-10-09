import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  FETCH_MESSAGES,
  ADD_MESSAGE
} from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/user/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const addMessage = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
  window.scrollTo(0, document.body.scrollHeight);
};

export const fetchMessages = () => dispatch => {
  axios
    .get("/messages/")
    .then(res => {
      dispatch({ type: FETCH_MESSAGES, payload: res.data });
      window.scrollTo(0, document.body.scrollHeight);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
