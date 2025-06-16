// components/NotificationBell.jsx
import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getNotificationCount, getNotifications } from "../../Redux/Notification/notification.action"
import NotificationPanel from "./NotificationPanel"

const NotificationBell = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { unreadCount, notifications, loading } = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(getNotificationCount())
    dispatch(getNotifications())
  }, [dispatch])

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="relative">
      <div onClick={handleClick} className="cursor-pointer relative">
        <Bell className="text-white w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Slide Panel */}
      {open && (
        <div className="absolute top-10 left-0 z-50 bg-[#121212] text-white w-72 rounded-lg shadow-lg border border-gray-700">
          <NotificationPanel
            isOpen={open}
            isFullPage={false}
            onClose={() => setOpen(false)}
            notifications={notifications}
            unreadCount={unreadCount}
            loading={loading}
            onNotificationClick={() => {
              setOpen(false)
            }}
            onRefresh={() => dispatch(getNotifications())}
          />
        </div>
      )}
    </div>
  )
}

export default NotificationBell

