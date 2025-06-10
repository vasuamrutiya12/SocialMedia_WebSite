import axios from "axios";
import {
  CREATE_STORY,
  GET_ALL_STORIES,
  GET_USER_STORIES,
  STORY_ERROR,
  MARK_STORY_WATCHED,
} from "./story.actionTypes";
import { api } from "../../config/api";
import { log } from "sockjs-client/dist/sockjs";


// Create a story
export const createStory = (storyData) => async (dispatch) => {
  try {

    const response = await api.post("/api/story", storyData, {
    });

    dispatch({
      type: CREATE_STORY,
      payload: response.data,
    });
    console.log("create Story:",response.data);
    
  } catch (error) {
    dispatch({
      type: STORY_ERROR,
      payload: error.response?.data || "Error creating story",
    });
    console.log("error in story");
    
  }
};

// Get all stories
export const getAllStories = () => async (dispatch) => {
  try {
    const response = await api.get("/api/story");

    dispatch({
      type: GET_ALL_STORIES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: STORY_ERROR,
      payload: error.response?.data || "Error fetching stories",
    });
  }
};

// Get stories by user
export const getUserStories = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/api/story/user/${userId}`);

    dispatch({
      type: GET_USER_STORIES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: STORY_ERROR,
      payload: error.response?.data || "Error fetching user stories",
    });
  }
};

export const markStoryWatched = (storyId) => ({
  type: MARK_STORY_WATCHED,
  payload: storyId,
});