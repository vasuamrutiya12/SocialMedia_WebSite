import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationService, { NotificationServiceClass } from '../services/NotificationService';
import { addNotification, getNotificationCount } from '../Redux/Notification/notification.action';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (!auth.user?.id) return;

    // Request browser notification permission
    NotificationServiceClass.requestPermission();

    // Connect to notification service
    NotificationService.connect(auth.user.id, (notification) => {
      // Add notification to Redux store
      dispatch(addNotification(notification));

      // Show browser notification
      NotificationService.showBrowserNotification(
        getNotificationTitle(notification),
        {
          body: getNotificationBody(notification),
          icon: notification.fromUser?.profile || '/favicon.ico',
          tag: notification.type,
        }
      );
    });

    // Get initial notification count
    dispatch(getNotificationCount());

    // Cleanup on unmount
    return () => {
      NotificationService.disconnect();
    };
  }, [auth.user?.id, dispatch]);

  const getNotificationTitle = (notification) => {
    switch (notification.type) {
      case 'LIKE':
        return 'New Like';
      case 'COMMENT':
        return 'New Comment';
      case 'FOLLOW':
        return 'New Follower';
      case 'MESSAGE':
        return 'New Message';
      case 'SAVE':
        return 'Post Saved';
      default:
        return 'New Notification';
    }
  };

  const getNotificationBody = (notification) => {
    const userName = notification.fromUser?.firstName || 'Someone';
    switch (notification.type) {
      case 'LIKE':
        return `${userName} liked your post`;
      case 'COMMENT':
        return `${userName} commented on your post`;
      case 'FOLLOW':
        return `${userName} started following you`;
      case 'MESSAGE':
        return `${userName} sent you a message`;
      case 'SAVE':
        return `${userName} saved your post`;
      default:
        return notification.message || 'You have a new notification';
    }
  };
};