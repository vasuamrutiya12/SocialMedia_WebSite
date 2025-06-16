import {
    GET_ALL_REELS,
    GET_USER_REELS,
    CREATE_REEL,
    SET_REELS_LOADING,
    REELS_ERROR,
  } from "./reels.actionType";
  import { api } from "../../config/api";
  
  export const getAllReels = () => async (dispatch) => {
    try {
      dispatch({ type: SET_REELS_LOADING });
  
      const res = await api.get("/api/reels");
      dispatch({ type: GET_ALL_REELS, payload: res.data });
  
    } catch (error) {
      dispatch({
        type: REELS_ERROR,
        payload: error.response?.data?.message || "Failed to fetch reels",
      });
    }
  };
  
  export const getReelsByUserId = (userId) => async (dispatch) => {
    try {
      dispatch({ type: SET_REELS_LOADING });
  
      const res = await api.get(`/api/reels/user/${userId}`);
      dispatch({ type: GET_USER_REELS, payload: res.data });
  
    } catch (error) {
      dispatch({
        type: REELS_ERROR,
        payload: error.response?.data?.message || "Failed to fetch user reels",
      });
    }
  };
  
  export const createReel = (reelData) => async (dispatch) => {
    try {
      const res = await api.post("/api/reels", reelData);
  
      dispatch({ type: CREATE_REEL, payload: res.data });
  
    } catch (error) {
      dispatch({
        type: REELS_ERROR,
        payload: error.response?.data?.message || "Failed to create reel",
      });
    }
  };
  