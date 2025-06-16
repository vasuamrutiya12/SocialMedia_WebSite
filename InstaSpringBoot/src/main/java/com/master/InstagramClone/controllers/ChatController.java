package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.request.CreateChatRequest;
import com.master.InstagramClone.services.ChatService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public Chat createChat(@RequestHeader("Authorization")String jwt,@RequestBody CreateChatRequest req) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.findUserById(req.getUserId());

        Chat chat = chatService.createChat(reqUser,user);
        return chat;
    }

    @GetMapping( )
    public List<Chat> findUserChats(@RequestHeader("Authorization")String jwt){
        User reqUser = userService.findUserByJwt(jwt);

        List<Chat> chats = chatService.findAllChatByUserId(reqUser.getId());
        return chats;
    }
}
