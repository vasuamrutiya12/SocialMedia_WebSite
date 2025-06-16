import {
  GET_ALL_REELS,
  GET_USER_REELS,
  CREATE_REEL,
  SET_REELS_LOADING,
  REELS_ERROR,
} from "./reels.actionType";

const initialState = {
  reels: [],
  loading: false,
  error: null,
};

const reelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REELS_LOADING:
      return { ...state, loading: true, error: null };
    case GET_ALL_REELS:
    case GET_USER_REELS:
      return { ...state, reels: action.payload, loading: false };
    case CREATE_REEL:
      return { ...state, reels: [action.payload, ...state.reels], loading: false };
    case REELS_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reelsReducer;
