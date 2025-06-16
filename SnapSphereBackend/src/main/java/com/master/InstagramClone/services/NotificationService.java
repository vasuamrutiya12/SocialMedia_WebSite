package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.models.Post;
import com.master.InstagramClone.models.Comment;

import java.util.List;

public interface NotificationService {

    Notification createNotification(User fromUser, User toUser, Notification.NotificationType type, String message);
    
    Notification createPostNotification(User fromUser, User toUser, Post post, Notification.NotificationType type, String message);
    
    Notification createCommentNotification(User fromUser, User toUser, Comment comment, String message);
    
    List<Notification> getUserNotifications(User user);
    
    List<Notification> getUnreadNotifications(User user);
    
    Long getUnreadNotificationCount(User user);
    
    Notification markAsRead(Integer notificationId, User user) throws Exception;
    
    void markAllAsRead(User user);
    
    void deleteNotification(Integer notificationId, User user) throws Exception;
    
    void sendRealTimeNotification(User toUser, Notification notification);
}