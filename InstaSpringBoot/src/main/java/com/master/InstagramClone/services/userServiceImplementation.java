package com.master.InstagramClone.services;

import com.master.InstagramClone.config.JwtProvider;
import com.master.InstagramClone.exceptions.UserExceptions;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class userServiceImplementation implements UserService {

    @Autowired
    UserRepo userRepo;

    @Override
    public User save(User user) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setGender(user.getGender());
        User savedUser = userRepo.save(newUser);
        return savedUser;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User findUserById(Integer userid) throws UserExceptions {
        Optional<User> user=userRepo.findById(userid);

        if(user.isPresent()){
            return user.get();
        }
        throw new UserExceptions("user not exist with userid "+userid);

    }

    @Override
    public String removeUser(Integer id) throws UserExceptions {
        Optional<User> user = userRepo.findById(id);

        if(!user.isPresent()){
            throw new UserExceptions("user id not exist "+id);
        }
        userRepo.delete(user.get());
        return "delete user successfully with id "+id;
    }

    @Override
    public User findUserByEmail(String useremail) throws UserExceptions {
        User user = userRepo.findByEmail(useremail);
        if(user.getId()!=null){
            return user;
        }
        throw new UserExceptions("user email not exist "+ useremail);
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepo.searchUser(query);
        return users;
    }

    @Override
    public User update(User user, Integer id) throws UserExceptions {
        Optional<User> user1 = userRepo.findById(id);

        if(user1.isEmpty()){
            throw new UserExceptions("user id not exist "+id);
        }

        User oldUser = user1.get();
        if(user.getFirstName()!=null){
            oldUser.setFirstName(user.getFirstName());
        }
        if(user.getLastName()!=null){
            oldUser.setLastName(user.getLastName());
        }
        if(user.getEmail()!=null) {
            oldUser.setEmail(user.getEmail());
        }
        if(user.getGender()!=null){
            oldUser.setGender(user.getGender());
        }
        User updatedUser = userRepo.save(oldUser);
        return updatedUser;
    }

    @Override
    public User followUser(Integer reqUserid, Integer userid) throws UserExceptions {
        User reqUser = findUserById(reqUserid);

        User user = findUserById(userid);

        reqUser.getFollowing().add(user.getId());
        user.getFollowers().add(reqUser.getId());

        userRepo.save(reqUser);
        userRepo.save(user);
        return reqUser;
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        return userRepo.findByEmail(email);
    }

}