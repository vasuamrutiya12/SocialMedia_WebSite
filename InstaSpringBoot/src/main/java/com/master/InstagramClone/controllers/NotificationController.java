package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.NotificationService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwt(jwt);
            List<Notification> notifications = notificationService.getUserNotifications(user);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwt(jwt);
            List<Notification> notifications = notificationService.getUnreadNotifications(user);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getUnreadNotificationCount(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwt(jwt);
            Long count = notificationService.getUnreadNotificationCount(user);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Notification> markAsRead(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Integer notificationId) {
        try {
            User user = userService.findUserByJwt(jwt);
            Notification notification = notificationService.markAsRead(notificationId, user);
            return ResponseEntity.ok(notification);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/read-all")
    public ResponseEntity<String> markAllAsRead(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwt(jwt);
            notificationService.markAllAsRead(user);
            return ResponseEntity.ok("All notifications marked as read");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to mark notifications as read");
        }
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Integer notificationId) {
        try {
            User user = userService.findUserByJwt(jwt);
            notificationService.deleteNotification(notificationId, user);
            return ResponseEntity.ok("Notification deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}