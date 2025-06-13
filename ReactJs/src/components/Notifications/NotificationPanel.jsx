"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Heart, MessageCircle, Bookmark, UserPlus, Check, CheckCheck, Sparkles, Zap } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getNotificationCount,
} from "../../Redux/Notification/notification.action"

const NotificationPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { notifications, unreadCount, loading } = useSelector((state) => state.notification)
  const [filter, setFilter] = useState("all") // all, unread, read

  useEffect(() => {
    if (isOpen) {
      dispatch(getNotifications())
      dispatch(getNotificationCount())
    }
  }, [isOpen, dispatch])

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationRead(notificationId))
  }

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsRead())
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "LIKE":
        return <Heart className="w-5 h-5 text-red-500" />
      case "COMMENT":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "FOLLOW":
        return <UserPlus className="w-5 h-5 text-green-500" />
      case "SAVE":
        return <Bookmark className="w-5 h-5 text-yellow-500" />
      case "MESSAGE":
        return <MessageCircle className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationMessage = (notification) => {
    switch (notification.type) {
      case "LIKE":
        return `${notification.fromUser?.firstName} liked your post`
      case "COMMENT":
        return `${notification.fromUser?.firstName} commented on your post`
      case "FOLLOW":
        return `${notification.fromUser?.firstName} started following you`
      case "SAVE":
        return `${notification.fromUser?.firstName} saved your post`
      case "MESSAGE":
        return `${notification.fromUser?.firstName} sent you a message`
      default:
        return notification.message || "New notification"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    if (filter === "read") return notification.read
    return true
  })

  const formatTime = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Enhanced Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Enhanced Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Bell className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Notifications
                    </h2>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs text-purple-300"
                      >
                        {unreadCount} new notifications
                      </motion.span>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Enhanced Filter Tabs */}
              <motion.div
                variants={itemVariants}
                className="flex space-x-1 p-4 border-b border-white/10 bg-black/10"
              >
                {["all", "unread", "read"].map((filterType) => (
                  <motion.button
                    key={filterType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      filter === filterType
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    {filterType === "unread" && unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Mark All as Read Button */}
              {unreadCount > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="p-4 border-b border-white/10 bg-black/10"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMarkAllAsRead}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium bg-blue-500/10 px-4 py-2 rounded-xl hover:bg-blue-500/20 transition-all duration-300"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>Mark all as read</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Enhanced Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-32"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full"
                    />
                  </motion.div>
                ) : filteredNotifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-32 text-gray-400"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <Bell className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <p className="font-medium">No notifications</p>
                    <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-1">
                    <AnimatePresence>
                      {filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className={`p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer border-l-4 relative overflow-hidden ${
                            notification.read
                              ? "border-transparent"
                              : "border-purple-500 bg-purple-500/5"
                          }`}
                          onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                        >
                          {/* Notification glow effect */}
                          {!notification.read && (
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"
                            />
                          )}

                          <div className="relative z-10 flex items-start space-x-3">
                            {/* Enhanced Avatar */}
                            <div className="flex-shrink-0 relative">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5"
                              >
                                <img
                                  src={
                                    notification.fromUser?.profile ||
                                    `https://ui-avatars.com/api/?name=${notification.fromUser?.firstName}&background=random`
                                  }
                                  alt={notification.fromUser?.firstName}
                                  className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                                />
                              </motion.div>
                              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-white text-sm font-medium leading-relaxed">
                                    {getNotificationMessage(notification)}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <p className="text-gray-400 text-xs">
                                      {formatTime(notification.createdAt)}
                                    </p>
                                    {!notification.read && (
                                      <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-2 h-2 bg-purple-500 rounded-full"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Post Preview */}
                          {notification.post && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 ml-15"
                            >
                              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                {notification.post.img && (
                                  <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    src={notification.post.img}
                                    alt="Post"
                                    className="w-10 h-10 rounded-lg object-cover border border-white/20"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-300 text-xs truncate">
                                    {notification.post.caption || "Your post"}
                                  </p>
                                </div>
                                <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationPanel