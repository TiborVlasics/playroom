import {
  FETCH_GAMES,
  LOAD_NEW_GAME,
  TAVERN_LOADING,
  GET_USER_PLAYING
} from "../actions/types";

const initialState = {
  isLoading: false,
  isUserPlaying: false,
  games: []
};

export default function tavernReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TAVERN_LOADING:
      return { ...state, isLoading: true };
    case FETCH_GAMES:
      return { ...state, games: action.payload, isLoading: false };
    case LOAD_NEW_GAME:
      return { ...state, games: state.concat(action.payload) };
    case GET_USER_PLAYING:
      return {
        ...state,
        isUserPlaying: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
