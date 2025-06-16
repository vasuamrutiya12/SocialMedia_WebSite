package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Chat;
import com.master.InstagramClone.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer> {

    List<Chat> findByUsers_Id(Integer userId);

    @Query("SELECT c FROM Chat c WHERE :user MEMBER OF c.users AND :reqUser MEMBER OF c.users")
    Chat findChatByUserId(@Param("user") User user, @Param("reqUser") User reqUser);
}
