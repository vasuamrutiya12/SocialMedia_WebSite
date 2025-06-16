package com.master.InstagramClone.services;

import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class userSuggestionServiceImplementation implements UserSuggestionService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> getUserSuggestions(User currentUser) {
        List<User> suggestions = new ArrayList<>();
        
        // Get mutual followers suggestions (priority)
        List<User> mutualSuggestions = getMutualFollowersSuggestions(currentUser);
        suggestions.addAll(mutualSuggestions);
        
        // If we need more suggestions, add recently joined users
        if (suggestions.size() < 10) {
            List<User> recentUsers = getRecentlyJoinedUsers(currentUser, 10 - suggestions.size());
            suggestions.addAll(recentUsers);
        }
        
        // If still need more, add random users
        if (suggestions.size() < 10) {
            List<User> randomUsers = getRandomUserSuggestions(currentUser, 10 - suggestions.size());
            suggestions.addAll(randomUsers);
        }
        
        // Remove duplicates and limit to 10
        return suggestions.stream()
                .distinct()
                .limit(10)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getMutualFollowersSuggestions(User currentUser) {
        List<User> suggestions = new ArrayList<>();
        Set<Integer> currentUserFollowing = new HashSet<>(currentUser.getFollowing());
        
        // Get users that current user's friends are following
        for (Integer followingId : currentUser.getFollowing()) {
            try {
                Optional<User> followingUserOpt = userRepo.findById(followingId);
                if (followingUserOpt.isPresent()) {
                    User followingUser = followingUserOpt.get();
                    
                    for (Integer suggestedUserId : followingUser.getFollowing()) {
                        // Don't suggest if already following or is current user
                        if (!currentUserFollowing.contains(suggestedUserId) && 
                            !suggestedUserId.equals(currentUser.getId())) {
                            
                            Optional<User> suggestedUserOpt = userRepo.findById(suggestedUserId);
                            if (suggestedUserOpt.isPresent()) {
                                User suggestedUser = suggestedUserOpt.get();
                                if (!suggestions.contains(suggestedUser)) {
                                    suggestions.add(suggestedUser);
                                }
                            }
                        }
                    }
                }
            } catch (Exception e) {
                // Continue with next user if error occurs
                continue;
            }
        }
        
        return suggestions.stream().limit(5).collect(Collectors.toList());
    }

    @Override
    public List<User> getRandomUserSuggestions(User currentUser, int limit) {
        List<User> allUsers = userRepo.findAll();
        Set<Integer> currentUserFollowing = new HashSet<>(currentUser.getFollowing());
        
        List<User> suggestions = allUsers.stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .filter(user -> !currentUserFollowing.contains(user.getId()))
                .collect(Collectors.toList());
        
        // Shuffle and limit
        Collections.shuffle(suggestions);
        return suggestions.stream().limit(limit).collect(Collectors.toList());
    }

    @Override
    public List<User> getRecentlyJoinedUsers(User currentUser, int limit) {
        List<User> allUsers = userRepo.findAll();
        Set<Integer> currentUserFollowing = new HashSet<>(currentUser.getFollowing());
        
        // Sort by ID (assuming higher ID means more recent)
        return allUsers.stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .filter(user -> !currentUserFollowing.contains(user.getId()))
                .sorted((u1, u2) -> u2.getId().compareTo(u1.getId())) // Descending order
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public void refreshUserSuggestions(User currentUser) {
        // This method can be used to implement caching logic
        // For now, it's a placeholder that could trigger cache refresh
        // In a production app, you might cache suggestions in Redis
        System.out.println("Refreshing suggestions for user: " + currentUser.getId());
    }
}