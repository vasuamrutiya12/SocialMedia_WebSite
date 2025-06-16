package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.UserService;
import com.master.InstagramClone.services.UserSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserSuggestionController {

    @Autowired
    private UserSuggestionService userSuggestionService;

    @Autowired
    private UserService userService;

    @GetMapping("/suggestions")
    public ResponseEntity<List<User>> getUserSuggestions(@RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<User> suggestions = userSuggestionService.getUserSuggestions(currentUser);
            
            // Remove sensitive information
            suggestions.forEach(user -> user.setPassword(null));
            
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/suggestions/mutual")
    public ResponseEntity<List<User>> getMutualFollowersSuggestions(@RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<User> suggestions = userSuggestionService.getMutualFollowersSuggestions(currentUser);
            
            // Remove sensitive information
            suggestions.forEach(user -> user.setPassword(null));
            
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/suggestions/refresh")
    public ResponseEntity<List<User>> refreshSuggestions(@RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            userSuggestionService.refreshUserSuggestions(currentUser);
            List<User> suggestions = userSuggestionService.getUserSuggestions(currentUser);
            
            // Remove sensitive information
            suggestions.forEach(user -> user.setPassword(null));
            
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/suggestions/recent")
    public ResponseEntity<List<User>> getRecentUsers(@RequestHeader("Authorization") String jwt) {
        try {
            User currentUser = userService.findUserByJwt(jwt);
            List<User> suggestions = userSuggestionService.getRecentlyJoinedUsers(currentUser, 5);
            
            // Remove sensitive information
            suggestions.forEach(user -> user.setPassword(null));
            
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}