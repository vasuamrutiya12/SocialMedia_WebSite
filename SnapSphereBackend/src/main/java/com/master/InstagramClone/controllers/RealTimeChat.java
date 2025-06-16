package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{chatId}")
    public Message sendToGroup(@Payload Message message,
                               @DestinationVariable String chatId) {

        simpMessagingTemplate.convertAndSend("/chat/" + chatId, message);
        return message;
    }

}
