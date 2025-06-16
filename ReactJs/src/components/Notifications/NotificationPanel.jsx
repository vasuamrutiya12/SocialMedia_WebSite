import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../Redux/Notification/notification.action";

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleNotificationClick = (n) => {
    setSelectedNotification(n);
    if (n.status === "unread") {
      // console.log(markNotificationRead(n.id));

      dispatch(markNotificationRead(n.id));
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const handleMarkAllRead = () => {
    // console.log(markAllNotificationsRead());

    dispatch(markAllNotificationsRead());
  };

  const filteredNotifications = notifications?.filter((n) => {
    if (filter === "all") return true;
    return n.status === filter;
  });

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        🔔 Notifications
      </h2>

      {/* Filter Tabs */}
      <div className="flex gap-4 my-6">
        {["all", "unread", "read"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full text-sm capitalize ${
              filter === type
                ? "bg-white text-black font-semibold"
                : "bg-gray-800 text-white"
            }`}
          >
            {type}
          </button>
        ))}
        <button
          onClick={handleMarkAllRead}
          className="ml-auto px-4 py-1 rounded-full text-sm bg-green-600 hover:bg-green-700"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      {loading ? (
        <p className="text-center mt-20 text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center mt-20 text-red-400">Error: {error}</p>
      ) : filteredNotifications?.length > 0 ? (
        <ul className="space-y-4">
          {filteredNotifications.map((n) => (
            <li
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`cursor-pointer border rounded-lg p-4 flex justify-between items-center transition ${
                n.status === "unread"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-900 border-gray-800"
              }`}
            >
              <div>
                <p>
                  <strong>{n.sender}</strong> {n.message}
                </p>
                <p className="text-sm text-gray-400">{n.time}</p>
              </div>
              <div className="text-xl">
                {n.status === "unread" ? "🔵" : "⚪"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-24 text-gray-500">
          <div className="text-4xl mb-4">🔕</div>
          <p>No notifications</p>
          <button
            onClick={() => dispatch(getNotifications())}
            className="underline text-sm mt-3"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Modal for Notification Details */}
      {selectedNotification && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-400 text-black rounded-xl shadow-lg w-[90%] max-w-lg p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-lg"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">
              🔔 Notification Details
            </h3>

            <div className="space-y-3 text-sm">

              <div>
                <strong>Message:</strong> {selectedNotification.message}
              </div>

              {selectedNotification.comment && (
                <div>
                  <strong>Comment:</strong> {selectedNotification.comment}
                </div>
              )}

              <div>
                <strong>From:</strong>{" "}
                {selectedNotification.fromUser?.firstName}{" "}
                {selectedNotification.fromUser?.lastName} 
              </div>


              {selectedNotification.post && (
                <div>
                  <strong>Post:</strong> <br />
                  Caption: {selectedNotification.post.caption}
                </div>
              )}


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
