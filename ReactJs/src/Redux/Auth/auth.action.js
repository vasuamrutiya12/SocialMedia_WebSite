import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    localStorage.removeItem("token");

    // Make sure to send loginData directly as payload (no wrapping)
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Login response data:", data.token);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
      return data.token;
    } else {
      throw new Error("JWT token missing in response");
    }
  } catch (error) {
    console.error("Login error:", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
    return Promise.reject(error);
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    localStorage.removeItem("token");

    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );

    if (data?.token) {
      localStorage.setItem("token", data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: data.token });
      return data.token;
    } else {
      throw new Error("JWT token missing in response");
    }
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
    return Promise.reject(error);
  }
};

export const getProfileAction = (token) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("profile ----", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("profile error:", error.response?.data || error.message);
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
    return Promise.reject(error);
  }
};

export const updateProfileAction = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const response = await api.put("/api/user", profileData);

    const updatedUser = response.data;

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: updatedUser });

    console.log("Profile updated successfully");

    return updatedUser; // Return for chaining .then()
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update profile";

    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: errorMessage });

    console.error(errorMessage);
    throw error;
  }
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`/api/user/search?query=${query}`);
    console.log("search user ----", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("-------", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};
