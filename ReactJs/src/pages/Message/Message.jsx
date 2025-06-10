import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton, TextField } from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WestIcon from "@mui/icons-material/West";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import bgImage from "./backGround_of_Chat.jpg";

import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";

import { getAllChats, createMessage } from "../../Redux/Message/message.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import SockJS, { log } from "sockjs-client/dist/sockjs";
import Stom from "stompjs";
import { Link } from "react-router-dom";


const Message = () => {
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();

  const handleSelectImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/"))
        return alert("Please select a valid image file under 5MB");
      if (file.size > 5 * 1024 * 1024)
        return alert("Image size must be under 5MB");

      setLoading(true);
      const imgUrl = await uploadToCloudinary(file, "image");
      setSelectImage(imgUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMessage = async (value) => {
    if (!value.trim() && !selectedImage) return;
    const messageData = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };

    await dispatch(createMessage({ messageData, sendMessageToServer }));
    setNewMessage("");
    setSelectImage(null);
    // setMessages([...messages, { ...messageData, userId: auth.user.id }]);
  };

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getAllChats(auth.user.id));
    }
  }, [dispatch, auth?.user?.id]);

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stom.over(sock);

    stomp.connect(
      {},
      () => {
        console.log("WebSocket connected ✅");
        setStompClient(stomp); // set after connection is established
      },
      (err) => {
        console.error("WebSocket connection error ❌:", err);
      }
    );
  }, []);

  const onConnect = () => {
    console.log("Web Shocket Connected");
  };

  const onErr = (error) => {
    console.log("errr ", error);
  };

  useEffect(() => {
    if (stompClient && stompClient.connected && currentChat && auth.user) {
      const subscription = stompClient.subscribe(
        `/chat/${currentChat.id}`,
        onMessageReceive
      );

      return () => subscription.unsubscribe(); // cleanup
    }
  }, [stompClient, currentChat, auth.user]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("Message received from WebSocket:", receivedMessage);
    setMessages((prev) => [...prev, receivedMessage]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#0f111a] text-white">
      {/* Sidebar */}
      <div
        className={`w-full md:w-[28%] max-h-[50%] md:max-h-full overflow-y-auto ${
          currentChat ? "hidden md:block" : "block"
        }`}
      >
        <div className="flex items-center p-4 space-x-3 border-b border-gray-800 bg-[#12141f]">
          <Link to="/" className="text-sky-400">
            <WestIcon className="cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-bold tracking-wide">ChatSpace</h1>
        </div>

        <div className="px-4 mt-3">
          <div className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#191c29] text-sm">
            <SearchUser />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 hideScrollbar mt-3 space-y-3">
          {message?.chats?.length > 0 ? (
            message.chats.map((item, index) => (
              <div
                key={index}
                className="hover:bg-[#22263a] transition-all duration-200 p-2 rounded-xl cursor-pointer"
                onClick={() => {
                  setCurrentChat(item);
                  setMessages(item.messages);
                }}
              >
                <UserChatCard chat={item} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">
              No conversations yet.
            </p>
          )}
        </div>
      </div>

      {/* Chat Panel */}
      <div
        className={`flex flex-col w-full md:w-[72%] h-screen ${
          !currentChat ? "hidden md:flex" : "flex"
        }`}
      >
        {currentChat ? (
          <>
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#12141f] border-b border-gray-800 p-4">
              <div className="flex items-center space-x-3">
                {/* Back button for mobile */}
                <div className="md:hidden">
                  <IconButton onClick={() => setCurrentChat(null)}>
                    <WestIcon className="text-sky-400" />
                  </IconButton>
                </div>
                <Avatar src="" />
                <p className="text-lg font-semibold">
                  {auth.user.id === currentChat.users[0].id
                    ? currentChat.users[1].firstName +
                      " " +
                      currentChat.users[1].lastName
                    : currentChat.users[0].firstName +
                      " " +
                      currentChat.users[0].lastName}
                </p>
              </div>
              <div className="hidden md:flex space-x-2">
                <IconButton>
                  <AddIcCallIcon className="text-sky-400" />
                </IconButton>
                <IconButton>
                  <VideoCallIcon className="text-sky-400" />
                </IconButton>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-6 pt-4 pb-2 space-y-4 hideScrollbar"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "auto",
                backgroundRepeat: "repeat",
                backgroundPosition: "top left",
              }}
            >
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg}
                  isOwnMessage={
                    msg.userId === auth.user.id || msg.user?.id === auth.user.id
                  }
                />
              ))}
            </div>

            {/* Input */}
            <div className="sticky bottom-0 z-20 bg-[#12141f] border-t border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <TextField
                  fullWidth
                  placeholder="Say something cool..."
                  size="small"
                  variant="outlined"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (
                      e.key === "Enter" &&
                      (e.target.value || selectedImage)
                    ) {
                      handleCreateMessage(e.target.value);
                    }
                  }}
                  disabled={loading}
                  InputProps={{
                    style: {
                      color: "white",
                      backgroundColor: "#191c29",
                      borderRadius: "8px",
                    },
                  }}
                />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  className="hidden"
                  disabled={loading}
                />
                <label htmlFor="file-upload">
                  <IconButton
                    component="span"
                    disabled={loading}
                    title="Upload image"
                  >
                    <AddPhotoAlternateIcon className="text-sky-400" />
                  </IconButton>
                </label>
                {loading && (
                  <p className="text-sm text-gray-400">Uploading...</p>
                )}
                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <button
                      onClick={() => setSelectImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center bg-[#0f111a] text-gray-400">
            <ChatBubbleOutlineIcon
              sx={{ fontSize: "8rem", color: "#374151" }}
            />
            <p className="text-xl font-medium mt-3">Start a Conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
