package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class chatServiceImplementation implements ChatService{

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private UserService userService;

    @Override
    public Chat createChat(User reqUser, User user) {

        Chat isExist = chatRepo.findChatByUserId(user,reqUser);

        if(isExist!=null){
            return isExist;
        }
        Chat chat = new Chat();

        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);
        chat.setTimeStamp(LocalDateTime.now());

        return chatRepo.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> chat = chatRepo.findById(chatId);

        if(chat.isEmpty()){
            throw new Exception("chat not found with id :"+chatId);
        }

        return chat.get();
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) {
        return chatRepo.findByUsers_Id(userId);
    }
}
