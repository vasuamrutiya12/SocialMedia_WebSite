import { api } from "../../config/api";
import * as actionType from "./suggestions.actionType";

// Get user suggestions
export const getUserSuggestions = () => async (dispatch) => {
  dispatch({ type: actionType.GET_SUGGESTIONS_REQUEST });
  try {
    const { data } = await api.get("/api/users/suggestions");
    dispatch({ type: actionType.GET_SUGGESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.GET_SUGGESTIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Follow a user
export const followUserSuggestion = (userId) => async (dispatch) => {
  dispatch({ type: actionType.FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.get(`/api/user/${userId}`);
    dispatch({ type: actionType.FOLLOW_USER_SUCCESS, payload: data });
    // Refresh suggestions after following
    dispatch(getUserSuggestions());
  } catch (error) {
    dispatch({
      type: actionType.FOLLOW_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Refresh suggestions
export const refreshSuggestions = () => async (dispatch) => {
  dispatch({ type: actionType.REFRESH_SUGGESTIONS_REQUEST });
  try {
    const { data } = await api.get("/api/users/suggestions/refresh");
    dispatch({ type: actionType.REFRESH_SUGGESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.REFRESH_SUGGESTIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};