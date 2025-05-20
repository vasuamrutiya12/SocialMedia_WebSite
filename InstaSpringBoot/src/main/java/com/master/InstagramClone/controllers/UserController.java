package com.master.InstagramClone.controllers;

import com.master.InstagramClone.exceptions.UserExceptions;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.UserRepo;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.findAllUsers();
    }

    @GetMapping("/user/id/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws UserExceptions {
        User user = userService.findUserById(id);
        return user;
    }

    @GetMapping("/user/email/{userEmail}")
    public User getUserByEmail(@PathVariable("userEmail") String email) throws UserExceptions {
        return userService.findUserByEmail(email);
    }


    @PutMapping("/user")
    public User updateuser(@RequestHeader("Authorization")String jwt,@RequestBody User user) throws UserExceptions {
        User reqUser = userService.findUserByJwt(jwt);

        User updateUser = userService.update(user,reqUser.getId());

        return updateUser;
    }

    @DeleteMapping("/user")
    public String deleteUser(@RequestHeader("Authorization")String jwt) throws UserExceptions {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.removeUser(reqUser.getId());
    }

    @GetMapping("/user/{userId}")
    public User followUser(@RequestHeader("Authorization")String jwt,@PathVariable("userId") Integer userid) throws UserExceptions {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(),userid);

        return user;
    }

    @GetMapping("/user/search")
    public List<User> searchUser(@RequestParam("query") String query){
        List<User> users = userService.searchUser(query);
        return users;
    }

    @GetMapping("/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization")String jwt){

        System.out.println("jwt----"+jwt);

        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }
}
