package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Post;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.repo.PostRepo;
import com.master.InstagramClone.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class postServiceImplementation implements PostService{

    @Autowired
    PostRepo postRepo;

    @Autowired
    UserService userService;

    @Autowired
    UserRepo userRepo;

    @Autowired
    NotificationService notificationService;

    @Override
    public Post createPost(Post post, Integer userId) throws Exception {
        // Find the user by ID
        User user = userService.findUserById(userId);
        if (user == null) {
            throw new Exception("User not found with ID: " + userId);
        }

        // Create a new post
        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImg(post.getImg());
        newPost.setVideo(post.getVideo());
        newPost.setCreatedAt(LocalDateTime.now()); // Ensure createdAt is set
        newPost.setUser(user);

        // Save post and return
        return postRepo.saveAndFlush(newPost); // Ensures immediate persistence
    }


    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findByPostId(postId);
        User user = userService.findUserById(userId);

        if(post.getUser().getId()!=user.getId()){
            throw new Exception("You can't delete another Post");
        }
        postRepo.delete(post);
        return "Post Delete succesfully " + postId;
    }

    @Override
    public List<Post> findPostByUserid(Integer userId) {
        return postRepo.findByUserId(userId);
    }

    @Override
    public Post findByPostId(Integer postId) throws Exception {
        Optional<Post> post=postRepo.findById(postId);

        if(post.isPresent()){
            return post.get();
        }
        throw new Exception("user not exist with userid "+postId);
    }

    @Override
    public List<Post> findAllPost() {
        List<Post> posts = postRepo.findAll();
        return posts;
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post post = findByPostId(postId);
        User user = userService.findUserById(userId);

        if (user.getSavedPost().contains(post)) {
            user.getSavedPost().remove(post);
        } else {
            user.getSavedPost().add(post);
            
            // Create notification for post save
            if (!post.getUser().getId().equals(userId)) {
                String message = user.getFirstName() + " saved your post";
                notificationService.createPostNotification(
                    user, 
                    post.getUser(), 
                    post, 
                    Notification.NotificationType.SAVE, 
                    message
                );
            }
        }

        userRepo.save(user);
        return post;
    }


    @Override
    public Post likepost(Integer postId, Integer userId) throws Exception {
        Post post = findByPostId(postId);
        User user = userService.findUserById(userId);

        boolean wasLiked = post.getLiked().contains(user);

        if (wasLiked) {
            post.getLiked().remove(user);
        } else {
            post.getLiked().add(user);
            
            // Create notification for post like
            if (!post.getUser().getId().equals(userId)) {
                String message = user.getFirstName() + " liked your post";
                notificationService.createPostNotification(
                    user, 
                    post.getUser(), 
                    post, 
                    Notification.NotificationType.LIKE, 
                    message
                );
            }
        }

        postRepo.save(post);
        return post;
    }


}