// Polyfill for global object
if (typeof global === 'undefined') {
  window.global = window;
}

import { Client } from '@stomp/stompjs';

class NotificationService {
  constructor() {
    this.stompClient = null;
    this.isConnected = false;
    this.subscriptions = new Map();
  }

  connect(userId, onNotificationReceived) {
    if (this.isConnected) return;

    try {
      this.stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          // Add any required headers here
        },
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        webSocketFactory: () => {
          return new WebSocket('ws://localhost:8080/ws');
        }
      });

      this.stompClient.onConnect = () => {
        console.log('Notification WebSocket connected');
        this.isConnected = true;

        // Subscribe to user-specific notifications
        const subscription = this.stompClient.subscribe(
          `/user/${userId}/notifications`,
          (message) => {
            const notification = JSON.parse(message.body);
            onNotificationReceived(notification);
          }
        );

        this.subscriptions.set('notifications', subscription);
      };

      this.stompClient.onStompError = (frame) => {
        console.error('Notification WebSocket connection error:', frame);
        this.isConnected = false;
      };

      this.stompClient.activate();
    } catch (error) {
      console.error('Failed to connect to notification service:', error);
    }
  }

  disconnect() {
    if (this.stompClient && this.isConnected) {
      // Unsubscribe from all subscriptions
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();

      this.stompClient.deactivate();
      this.isConnected = false;
      console.log('Notification WebSocket disconnected');
    }
  }

  // Send a notification (for testing purposes)
  sendNotification(notification) {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination: '/app/notification',
        body: JSON.stringify(notification)
      });
    }
  }

  // Request browser notification permission
  static async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Show browser notification
  static showBrowserNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    }
  }
}

export { NotificationService as NotificationServiceClass };
export default new NotificationService();