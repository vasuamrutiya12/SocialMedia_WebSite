package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message,Integer> {

    List<Message> findByChatId(Integer chatId);

}
