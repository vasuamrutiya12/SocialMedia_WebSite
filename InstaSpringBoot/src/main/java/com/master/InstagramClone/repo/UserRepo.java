package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.firstName LIKE %:query% OR u.lastName LIKE %:query% OR u.email LIKE %:query%")
    List<User> searchUser(@Param("query") String query);



    User findByEmail(String email);
}

