import * as actionType from "./notification.actionType";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_NOTIFICATIONS_REQUEST:
    case actionType.MARK_NOTIFICATION_READ_REQUEST:
    case actionType.MARK_ALL_NOTIFICATIONS_READ_REQUEST:
    case actionType.GET_NOTIFICATION_COUNT_REQUEST:
      return { ...state, loading: true, error: null };

    case actionType.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null,
      };

    case actionType.MARK_NOTIFICATION_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
        loading: false,
        error: null,
      };

    case actionType.MARK_ALL_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
        loading: false,
        error: null,
      };

    case actionType.GET_NOTIFICATION_COUNT_SUCCESS:
      return {
        ...state,
        unreadCount: action.payload,
        loading: false,
        error: null,
      };

    case actionType.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };

    case actionType.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case actionType.GET_NOTIFICATIONS_FAILURE:
    case actionType.MARK_NOTIFICATION_READ_FAILURE:
    case actionType.MARK_ALL_NOTIFICATIONS_READ_FAILURE:
    case actionType.GET_NOTIFICATION_COUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};