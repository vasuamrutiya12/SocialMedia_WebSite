"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, IconButton, TextField } from "@mui/material"
import { Phone, Video, Image, ArrowLeft, Send, Smile, Paperclip, MoreVertical } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import bgImage from "./backGround_of_Chat.jpg"

import SearchUser from "../../components/SearchUser/SearchUser"
import UserChatCard from "./UserChatCard"
import ChatMessage from "./ChatMessage"

import { getAllChats, createMessage } from "../../Redux/Message/message.action"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary"
import SockJS from "sockjs-client/dist/sockjs"
import Stomp from "stompjs"

const Message = () => {
  const { message, auth } = useSelector((store) => store)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [selectedImage, setSelectImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef(null)
  const dispatch = useDispatch()

  const handleSelectImage = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file || !file.type.startsWith("image/"))
        return alert("Please select a valid image file under 5MB")
      if (file.size > 5 * 1024 * 1024)
        return alert("Image size must be under 5MB")

      setLoading(true)
      const imgUrl = await uploadToCloudinary(file, "image")
      setSelectImage(imgUrl)
    } catch (err) {
      console.error("Upload failed:", err)
      alert("Image upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMessage = async (value) => {
    if (!value.trim() && !selectedImage) return
    const messageData = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    }

    await dispatch(createMessage({ messageData, sendMessageToServer }))
    setNewMessage("")
    setSelectImage(null)
  }

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getAllChats(auth.user.id))
    }
  }, [dispatch, auth?.user?.id])

  const [stompClient, setStompClient] = useState(null)

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws")
    const stomp = Stomp.over(sock)

    stomp.connect(
      {},
      () => {
        console.log("WebSocket connected ✅")
        setStompClient(stomp)
      },
      (err) => {
        console.error("WebSocket connection error ❌:", err)
      }
    )
  }, [])

  useEffect(() => {
    if (stompClient && stompClient.connected && currentChat && auth.user) {
      const subscription = stompClient.subscribe(
        `/chat/${currentChat.id}`,
        onMessageReceive
      )

      return () => subscription.unsubscribe()
    }
  }, [stompClient, currentChat, auth.user])

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      )
    }
  }

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body)
    console.log("Message received from WebSocket:", receivedMessage)
    setMessages((prev) => [...prev, receivedMessage])
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const chatVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        className={`relative z-10 w-full md:w-[28%] max-h-[50%] md:max-h-full overflow-y-auto ${
          currentChat ? "hidden md:block" : "block"
        } bg-black/40 backdrop-blur-xl border-r border-white/10`}
      >
        {/* Header */}
        <div className="flex items-center p-6 space-x-4 border-b border-white/10 bg-black/20">
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            <motion.div
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            ChatSpace
          </motion.h1>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-3 hover:border-white/20 transition-all duration-300">
            <SearchUser />
          </div>
        </motion.div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          <AnimatePresence>
            {message?.chats?.length > 0 ? (
              message.chats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="hover:bg-white/5 transition-all duration-300 p-3 rounded-2xl cursor-pointer border border-transparent hover:border-white/10"
                  onClick={() => {
                    setCurrentChat(item)
                    setMessages(item.messages)
                  }}
                >
                  <UserChatCard chat={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-gray-400 mt-16"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-purple-400" />
                </div>
                <p>No conversations yet.</p>
                <p className="text-sm mt-2">Start chatting with someone!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat Panel */}
      <motion.div
        variants={chatVariants}
        className={`relative z-10 flex flex-col w-full md:w-[72%] h-screen ${
          !currentChat ? "hidden md:flex" : "flex"
        } bg-black/20 backdrop-blur-xl`}
      >
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="sticky top-0 z-20 bg-black/40 backdrop-blur-xl border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Back button for mobile */}
                  <div className="md:hidden">
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentChat(null)}
                    >
                      <ArrowLeft className="w-6 h-6 text-blue-400" />
                    </motion.button>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                      <Avatar sx={{ width: "100%", height: "100%", border: "2px solid black" }} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" />
                  </motion.div>
                  
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-lg font-semibold"
                    >
                      {auth.user.id === currentChat.users[0].id
                        ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName
                        : currentChat.users[0].firstName + " " + currentChat.users[0].lastName}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-green-400"
                    >
                      {isTyping ? "Typing..." : "Online"}
                    </motion.p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <Video className="w-5 h-5 text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-6 pt-4 pb-2 space-y-4"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "auto",
                backgroundRepeat: "repeat",
                backgroundPosition: "top left",
              }}
            >
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChatMessage
                      message={msg}
                      isOwnMessage={
                        msg.userId === auth.user.id || msg.user?.id === auth.user.id
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="sticky bottom-0 z-20 bg-black/40 backdrop-blur-xl border-t border-white/10 p-4">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <Smile className="w-5 h-5 text-yellow-400" />
                </motion.button>

                <div className="flex-1 relative">
                  <TextField
                    fullWidth
                    placeholder="Type a message... ✨"
                    size="small"
                    variant="outlined"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && (e.target.value || selectedImage)) {
                        handleCreateMessage(e.target.value)
                      }
                    }}
                    disabled={loading}
                    InputProps={{
                      style: {
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "24px",
                        backdropFilter: "blur(10px)",
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(168, 85, 247, 0.8)',
                        },
                      },
                    }}
                  />
                </div>

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  className="hidden"
                  disabled={loading}
                />
                <label htmlFor="file-upload">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    component="span"
                    disabled={loading}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <Image className="w-5 h-5 text-blue-400" />
                  </motion.button>
                </label>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCreateMessage(newMessage)}
                  disabled={!newMessage.trim() && !selectedImage}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Image Preview */}
              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="mt-3 relative inline-block"
                  >
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-2xl border-2 border-white/20"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
                    >
                      ×
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 flex items-center gap-2 text-sm text-gray-400"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
                  />
                  Uploading image...
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center items-center bg-black/10 text-gray-400"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <Send className="w-12 h-12 text-purple-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Start a Conversation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-center max-w-md"
            >
              Select a chat from the sidebar to start messaging, or search for someone new to connect with.
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Message