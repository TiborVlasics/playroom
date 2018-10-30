import {
  FETCH_GAMES,
  LOAD_NEW_GAME,
  UNLOAD_GAME,
  TAVERN_LOADING,
  CLEAR_GAMES
} from "../actions/types";

const initialState = {
  isLoading: false,
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
    case UNLOAD_GAME:
      return { ...state, games: state.games.filter(game => game._id !== action.payload._id) }
    case CLEAR_GAMES:
      return { ...state, games: [] }
    default:
      return state;
  }
}
