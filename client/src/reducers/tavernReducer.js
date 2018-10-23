import {
  FETCH_GAMES,
  LOAD_NEW_GAME,
  TAVERN_LOADING,
  GET_CURRENT_GAME,
  CLEAR_GAMES
} from "../actions/types";

const initialState = {
  isLoading: false,
  currentGame: null,
  games: []
};

export default function tavernReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TAVERN_LOADING:
      return { ...state, isLoading: true };
    case FETCH_GAMES:
      return { ...state, games: action.payload, isLoading: false };
    case LOAD_NEW_GAME:
      return { ...state, games: state.games.concat(action.payload) };
    case GET_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload,
        isLoading: false
      };
    case CLEAR_GAMES:
      return { ...state, games: [] }
    default:
      return state;
  }
}
