import { api } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

// CREATE POST
export const createPostAction = (values) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  const postData = {
    caption: values.caption,
    ...(values.img && { img: values.img }), // ✅ Correct field name
    ...(values.video && { video: values.video }),
  };

  try {
    const { data } = await api.post(`/api/posts/user`, postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("✅ Created post:", data);
  } catch (error) {
    console.error("❌ Create post error:", error);
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET ALL POSTS
export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts`);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    console.log("✅ Fetched all posts:", data);
  } catch (error) {
    console.error("❌ Get all posts error:", error);
    dispatch({
      type: GET_ALL_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET USER'S POSTS
export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    console.log("✅ Data received:", data);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Get user's posts error:", error);
    dispatch({
      type: GET_USERS_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};



// LIKE POST
export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/${postId}/user/likepost`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log(`✅ Liked post ${postId}:`, data);
  } catch (error) {
    console.error("❌ Like post error:", error);
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// CREATE COMMENT
export const createCommnetAction = (commentData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });

  try {
    console.log("✅ Created ");
    const { data } = await api.post(
      `/api/comment/post/${commentData.postId}`,
      commentData.data
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("✅ Created Comment:", data);
  } catch (error) {
    console.error("❌ Create comment error:", error);
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
