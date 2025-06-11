import { api } from "../../config/api";
import * as actionType from "./notification.actionType";

// Get all notifications
export const getNotifications = () => async (dispatch) => {
  dispatch({ type: actionType.GET_NOTIFICATIONS_REQUEST });
  try {
    const { data } = await api.get("/api/notifications");
    dispatch({ type: actionType.GET_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.GET_NOTIFICATIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Mark notification as read
export const markNotificationRead = (notificationId) => async (dispatch) => {
  dispatch({ type: actionType.MARK_NOTIFICATION_READ_REQUEST });
  try {
    const { data } = await api.put(`/api/notifications/${notificationId}/read`);
    dispatch({ type: actionType.MARK_NOTIFICATION_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.MARK_NOTIFICATION_READ_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Mark all notifications as read
export const markAllNotificationsRead = () => async (dispatch) => {
  dispatch({ type: actionType.MARK_ALL_NOTIFICATIONS_READ_REQUEST });
  try {
    const { data } = await api.put("/api/notifications/read-all");
    dispatch({ type: actionType.MARK_ALL_NOTIFICATIONS_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.MARK_ALL_NOTIFICATIONS_READ_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get notification count
export const getNotificationCount = () => async (dispatch) => {
  dispatch({ type: actionType.GET_NOTIFICATION_COUNT_REQUEST });
  try {
    const { data } = await api.get("/api/notifications/count");
    dispatch({ type: actionType.GET_NOTIFICATION_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.GET_NOTIFICATION_COUNT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add notification (for real-time updates)
export const addNotification = (notification) => ({
  type: actionType.ADD_NOTIFICATION,
  payload: notification,
});

// Remove notification
export const removeNotification = (notificationId) => ({
  type: actionType.REMOVE_NOTIFICATION,
  payload: notificationId,
});