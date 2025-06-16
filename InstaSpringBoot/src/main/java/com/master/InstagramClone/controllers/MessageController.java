package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Message;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.MessageService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/chat/{chatId}")
    public Message createMessage(@RequestHeader("Authorization")String jwt, @RequestBody Message message, @PathVariable("chatId")Integer chatId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);

        return messageService.createMessage(reqUser,chatId,message);
    }

    @GetMapping("/chat/{chatId}")
    public List<Message> findChatMessages(@PathVariable("chatId")Integer chatId) throws Exception {
        return messageService.findChatMessages(chatId);
    }
}
