"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Heart, MessageCircle, Bookmark, UserPlus, Check, CheckCheck } from "lucide-react"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 p-4 border-b border-white/10">
              {["all", "unread", "read"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === filterType
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  {filterType === "unread" && unreadCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mark All as Read Button */}
            {unreadCount > 0 && (
              <div className="p-4 border-b border-white/10">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Mark all as read</span>
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <Bell className="w-12 h-12 mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 ${
                        notification.read
                          ? "border-transparent"
                          : "border-blue-500 bg-blue-500/5"
                      }`}
                      onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              notification.fromUser?.profile ||
                              `https://ui-avatars.com/api/?name=${notification.fromUser?.firstName}&background=random`
                            }
                            alt={notification.fromUser?.firstName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              {getNotificationIcon(notification.type)}
                              <p className="text-white text-sm">
                                {getNotificationMessage(notification)}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            {formatTime(notification.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Post Preview (if applicable) */}
                      {notification.post && (
                        <div className="mt-3 ml-13">
                          <div className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                            {notification.post.img && (
                              <img
                                src={notification.post.img}
                                alt="Post"
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <p className="text-gray-300 text-xs truncate">
                              {notification.post.caption || "Your post"}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationPanel