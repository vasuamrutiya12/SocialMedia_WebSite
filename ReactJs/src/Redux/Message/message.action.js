import { api } from "../../config/api";
import * as actionType from "./message.actionType";

// Create a message
export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    console.log(reqData.messageData);
    
    const { data } = await api.post(`/api/message/chat/${reqData.messageData.chatId}`, reqData.messageData);
    reqData.sendMessageToServer(data)
    console.log("Created message:", data);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Create message error:", error);
    dispatch({
      type: actionType.CREATE_MESSAGE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create a new chat
export const createChat = ({ userId }) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST });
    try {
      const { data } = await api.post(`/api/chat`, { userId }); // ✅ Send body
      console.log("Created chat:", data);
      dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
      console.error("Create chat error:", error);
      dispatch({
        type: actionType.CREATE_CHAT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  

// Get all chats for the user
export const getAllChats = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get(`/api/chat`);
    console.log("Fetched all chats:", data);
    dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get all chats error:", error);
    dispatch({
      type: actionType.GET_ALL_CHATS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
