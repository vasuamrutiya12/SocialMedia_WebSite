import {
  CREATE_STORY,
  GET_ALL_STORIES,
  GET_USER_STORIES,
  STORY_ERROR,
  MARK_STORY_WATCHED,
} from "./story.actionTypes";

const initialState = {
  stories: [],
  userStories: [],
  watchedStoryIds: [],
  error: null,
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY:
      return {
        ...state,
        stories: [action.payload, ...state.stories],
        error: null,
      };
    case GET_ALL_STORIES:
      return {
        ...state,
        stories: action.payload.sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        ),
        error: null,
      };
    case GET_USER_STORIES:
      return {
        ...state,
        userStories: action.payload,
        error: null,
      };
    case MARK_STORY_WATCHED:
      return {
        ...state,
        watchedStoryIds: [
          ...new Set([...state.watchedStoryIds, action.payload]),
        ],
      };
    case STORY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default storyReducer;
