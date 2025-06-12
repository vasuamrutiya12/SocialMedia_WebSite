package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.Message;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.repo.ChatRepo;
import com.master.InstagramClone.repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class messageServiceImplementation implements MessageService{

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Message createMessage(User user, Integer chatId, Message message) throws Exception {
        Message createMessage = new Message();

        Chat chat = chatService.findChatById(chatId);

        // Check if the user is a participant in the chat
        if (!chat.getUsers().contains(user)) {
            throw new Exception("User is not a participant in this chat.");
        }

        createMessage.setChat(chat);
        createMessage.setUser(user);
        createMessage.setContent(message.getContent());
        createMessage.setImg(message.getImg());
        createMessage.setTimeStamp(LocalDateTime.now());

        Message savedMessage = messageRepo.save(createMessage);

        chat.getMessages().add(savedMessage);
        chatRepo.save(chat);

        // Create notification for message (to other participants)
        for (User participant : chat.getUsers()) {
            if (!participant.getId().equals(user.getId())) {
                String notificationMessage = user.getFirstName() + " sent you a message";
                notificationService.createNotification(
                    user, 
                    participant, 
                    Notification.NotificationType.MESSAGE, 
                    notificationMessage
                );
            }
        }

        return savedMessage;
    }

    @Override
    public List<Message> findChatMessages(Integer chatId) throws Exception {

        Chat chat = chatService.findChatById(chatId);

        return messageRepo.findByChatId(chatId);
    }
}