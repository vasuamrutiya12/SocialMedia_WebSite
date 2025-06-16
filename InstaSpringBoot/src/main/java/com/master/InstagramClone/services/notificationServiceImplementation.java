package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.models.Post;
import com.master.InstagramClone.models.Comment;
import com.master.InstagramClone.repo.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class notificationServiceImplementation implements NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public Notification createNotification(User fromUser, User toUser, Notification.NotificationType type, String message) {
        // Don't create notification if user is notifying themselves
        if (fromUser.getId().equals(toUser.getId())) {
            return null;
        }

        Notification notification = new Notification();
        notification.setFromUser(fromUser);
        notification.setToUser(toUser);
        notification.setType(type);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        Notification savedNotification = notificationRepo.save(notification);
        
        // Send real-time notification
        sendRealTimeNotification(toUser, savedNotification);
        
        return savedNotification;
    }

    @Override
    public Notification createPostNotification(User fromUser, User toUser, Post post, Notification.NotificationType type, String message) {
        // Don't create notification if user is interacting with their own post
        if (fromUser.getId().equals(toUser.getId())) {
            return null;
        }

        // Check if similar notification already exists (for likes)
        if (type == Notification.NotificationType.LIKE) {
            Notification existing = notificationRepo.findExistingNotification(toUser, fromUser, type, post);
            if (existing != null) {
                return existing; // Don't create duplicate like notifications
            }
        }

        Notification notification = new Notification();
        notification.setFromUser(fromUser);
        notification.setToUser(toUser);
        notification.setPost(post);
        notification.setType(type);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        Notification savedNotification = notificationRepo.save(notification);
        
        // Send real-time notification
        sendRealTimeNotification(toUser, savedNotification);
        
        return savedNotification;
    }

    @Override
    public Notification createCommentNotification(User fromUser, User toUser, Comment comment, String message) {
        if (fromUser.getId().equals(toUser.getId())) {
            return null;
        }

        Notification notification = new Notification();
        notification.setFromUser(fromUser);
        notification.setToUser(toUser);
        notification.setComment(comment);
        notification.setType(Notification.NotificationType.COMMENT);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        Notification savedNotification = notificationRepo.save(notification);
        
        // Send real-time notification
        sendRealTimeNotification(toUser, savedNotification);
        
        return savedNotification;
    }

    @Override
    public List<Notification> getUserNotifications(User user) {
        return notificationRepo.findByToUserOrderByCreatedAtDesc(user);
    }

    @Override
    public List<Notification> getUnreadNotifications(User user) {
        return notificationRepo.findUnreadNotificationsByUser(user);
    }

    @Override
    public Long getUnreadNotificationCount(User user) {
        return notificationRepo.countUnreadNotifications(user);
    }

    @Override
    public Notification markAsRead(Integer notificationId, User user) throws Exception {
        Optional<Notification> notificationOpt = notificationRepo.findById(notificationId);
        
        if (notificationOpt.isEmpty()) {
            throw new Exception("Notification not found");
        }
        
        Notification notification = notificationOpt.get();
        
        // Check if the notification belongs to the user
        if (!notification.getToUser().getId().equals(user.getId())) {
            throw new Exception("Unauthorized access to notification");
        }
        
        notification.setRead(true);
        return notificationRepo.save(notification);
    }

    @Override
    public void markAllAsRead(User user) {
        List<Notification> unreadNotifications = notificationRepo.findUnreadNotificationsByUser(user);
        
        for (Notification notification : unreadNotifications) {
            notification.setRead(true);
        }
        
        notificationRepo.saveAll(unreadNotifications);
    }

    @Override
    public void deleteNotification(Integer notificationId, User user) throws Exception {
        Optional<Notification> notificationOpt = notificationRepo.findById(notificationId);
        
        if (notificationOpt.isEmpty()) {
            throw new Exception("Notification not found");
        }
        
        Notification notification = notificationOpt.get();
        
        // Check if the notification belongs to the user
        if (!notification.getToUser().getId().equals(user.getId())) {
            throw new Exception("Unauthorized access to notification");
        }
        
        notificationRepo.delete(notification);
    }

    @Override
    public void sendRealTimeNotification(User toUser, Notification notification) {
        try {
            // Send to user-specific channel
            messagingTemplate.convertAndSendToUser(
                toUser.getId().toString(),
                "/notifications",
                notification
            );
        } catch (Exception e) {
            System.err.println("Failed to send real-time notification: " + e.getMessage());
        }
    }
}