import * as types from "../actions/types";

const initialState = {
  isLoading: false,
  games: []
};

export default function tavernReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TAVERN_LOADING:
      return { ...state, isLoading: true };
    case types.LOAD_GAMES:
      return { ...state, games: action.payload, isLoading: false };
    case types.LOAD_NEW_GAME:
      return { ...state, games: state.games.concat(action.payload) };
    case types.UNLOAD_GAME:
      return {
        ...state,
        games: state.games.filter(game => game._id !== action.payload._id)
      };
    case types.CLEAR_GAMES:
      return { ...state, games: [] };
    default:
      return state;
  }
}
