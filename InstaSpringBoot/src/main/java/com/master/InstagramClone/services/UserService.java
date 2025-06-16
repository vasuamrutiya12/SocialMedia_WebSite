package com.master.InstagramClone.services;

import com.master.InstagramClone.exceptions.UserExceptions;
import com.master.InstagramClone.models.User;

import java.util.List;

public interface UserService {

    public User save(User newUser);

    public List<User> findAllUsers();

    public User findUserById(Integer userid) throws UserExceptions;

    public String removeUser(Integer id) throws UserExceptions;

    public User findUserByEmail(String useremail) throws UserExceptions;

    public List<User> searchUser(String query);

    public User update(User user,Integer id) throws UserExceptions;

    public User followUser(Integer reqUser,Integer userid) throws UserExceptions;

    public User findUserByJwt(String jwt);
}