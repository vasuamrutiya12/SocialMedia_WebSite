package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {

    List<Notification> findByToUserOrderByCreatedAtDesc(User toUser);

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.toUser = :user AND n.read = false")
    Long countUnreadNotifications(@Param("user") User user);

    @Query("SELECT n FROM Notification n WHERE n.toUser = :user AND n.read = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadNotificationsByUser(@Param("user") User user);

    @Query("SELECT n FROM Notification n WHERE n.toUser = :user AND n.read = true ORDER BY n.createdAt DESC")
    List<Notification> findReadNotificationsByUser(@Param("user") User user);

    @Query("SELECT n FROM Notification n WHERE n.toUser = :toUser AND n.fromUser = :fromUser AND n.type = :type AND n.post = :post")
    Notification findExistingNotification(@Param("toUser") User toUser, 
                                        @Param("fromUser") User fromUser, 
                                        @Param("type") Notification.NotificationType type, 
                                        @Param("post") com.master.InstagramClone.models.Post post);
}