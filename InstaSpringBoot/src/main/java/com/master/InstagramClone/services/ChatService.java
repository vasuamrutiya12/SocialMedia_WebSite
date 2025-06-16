package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.User;

import java.util.List;

public interface ChatService {

    public Chat createChat(User reqUserId, User userId2);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findAllChatByUserId(Integer userId);
}
