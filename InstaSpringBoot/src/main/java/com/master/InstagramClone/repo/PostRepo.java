package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Integer> {

    @Query("SELECT p FROM Post p WHERE p.user.id = :userId")
    List<Post> findByUserId(@Param("userId") Integer userId);

}
