package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.Message;
import com.master.InstagramClone.models.User;

import java.util.List;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message message) throws Exception;

    public List<Message> findChatMessages(Integer chatId) throws Exception;
}
