"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getNotificationCount } from "../../Redux/Notification/notification.action"
import NotificationPanel from "./NotificationPanel"

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { unreadCount } = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(getNotificationCount())
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      dispatch(getNotificationCount())
    }, 30000)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <NotificationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default NotificationBell