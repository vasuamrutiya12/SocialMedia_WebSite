import * as actionType from "./suggestions.actionType";

const initialState = {
  suggestions: [],
  loading: false,
  error: null,
  followLoading: false,
};

export const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SUGGESTIONS_REQUEST:
    case actionType.REFRESH_SUGGESTIONS_REQUEST:
      return { ...state, loading: true, error: null };

    case actionType.FOLLOW_USER_REQUEST:
      return { ...state, followLoading: true, error: null };

    case actionType.GET_SUGGESTIONS_SUCCESS:
    case actionType.REFRESH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.payload,
        loading: false,
        error: null,
      };

    case actionType.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        followLoading: false,
        error: null,
        // Remove the followed user from suggestions
        suggestions: state.suggestions.filter(
          (user) => user.id !== action.payload.id
        ),
      };

    case actionType.GET_SUGGESTIONS_FAILURE:
    case actionType.REFRESH_SUGGESTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case actionType.FOLLOW_USER_FAILURE:
      return { ...state, followLoading: false, error: action.payload };

    default:
      return state;
  }
};