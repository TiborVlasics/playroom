import axios from "axios";
import setAuthToken from "../helper/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOGOUT,
  SET_USER_HISTORY
} from "./types";
import { getCurrentGame } from "./gameActions";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
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
    .post("/api/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
      dispatch(getCurrentGame());
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
  dispatch({ type: USER_LOGOUT });
};

export const getUserHistory = () => dispatch => {
  axios.get("/api/user/current/logs").then(history => {
    dispatch(setUserHistory(history.data));
  });
};

export const setUserHistory = history => dispatch => {
  return dispatch({
    type: SET_USER_HISTORY,
    payload: history
  });
};

export const clearUserHistory = () => dispatch => {
  return dispatch({
    type: SET_USER_HISTORY,
    payload: []
  });
};
