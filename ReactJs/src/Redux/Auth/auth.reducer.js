import { searchUser } from "./auth.action";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  SEARCH_USER_SUCCESS,
} from "./auth.actionType";

const initialState = {
  token: null, // Consistently use `token` or `jwt`, don't mix
  error: null,
  loading: false,
  user: null,
  searchUser: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload, // Make sure you set token here, not jwt
        loading: false,
        error: null,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
