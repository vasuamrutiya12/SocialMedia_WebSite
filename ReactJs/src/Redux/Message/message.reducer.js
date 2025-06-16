import * as actionType from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {  // <-- correct
      case actionType.CREATE_MESSAGE_SUCCESS:
        return { ...state, message: action.payload };
      case actionType.CREATE_CHAT_SUCCESS:
        return { ...state, chats: [action.payload, ...state.chats] };
      case actionType.GET_ALL_CHATS_SUCCESS:
        return { ...state, chats: action.payload };
      default:
        return state;
    }
  };
  
