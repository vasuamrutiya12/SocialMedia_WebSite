package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeNotification {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/notification")
    public void sendNotification(@Payload Notification notification) {
        // Send notification to specific user
        simpMessagingTemplate.convertAndSendToUser(
            notification.getToUser().getId().toString(),
            "/notifications",
            notification
        );
    }

    @MessageMapping("/notification/{userId}")
    public void sendNotificationToUser(
            @Payload Notification notification,
            @DestinationVariable String userId) {
        
        simpMessagingTemplate.convertAndSendToUser(
            userId,
            "/notifications",
            notification
        );
    }
}