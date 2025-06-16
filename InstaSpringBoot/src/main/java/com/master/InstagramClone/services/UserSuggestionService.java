package com.master.InstagramClone.services;

import com.master.InstagramClone.models.User;
import java.util.List;

public interface UserSuggestionService {
    
    List<User> getUserSuggestions(User currentUser);
    
    List<User> getMutualFollowersSuggestions(User currentUser);
    
    List<User> getRandomUserSuggestions(User currentUser, int limit);
    
    List<User> getRecentlyJoinedUsers(User currentUser, int limit);
    
    void refreshUserSuggestions(User currentUser);
}