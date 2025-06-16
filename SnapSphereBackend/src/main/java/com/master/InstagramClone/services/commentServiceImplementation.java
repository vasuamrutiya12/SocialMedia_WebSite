package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Comment;
import com.master.InstagramClone.models.Post;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.models.Notification;
import com.master.InstagramClone.repo.CommentRepo;
import com.master.InstagramClone.repo.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class commentServiceImplementation implements CommentService{

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {

        User user = userService.findUserById(userId);
        Post post = postService.findByPostId(postId);
        
        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment newComment = commentRepo.save(comment);

        post.getComments().add(newComment);
        postRepo.save(post);

        // Create notification for comment
        if (!post.getUser().getId().equals(userId)) {
            String message = user.getFirstName() + " commented on your post";
            notificationService.createCommentNotification(
                user, 
                post.getUser(), 
                newComment, 
                message
            );
        }

        return newComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {
        Optional<Comment> comment=commentRepo.findById(commentId);

        if(comment.isPresent()){
            return comment.get();
        }
        throw new Exception("user not exist with userid "+commentId);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        Comment comment = findCommentById(commentId);
        User user = userService.findUserById(userId);

        if(comment.getLiked().contains(user)){
            comment.getLiked().remove(user);
        }
        else{
            comment.getLiked().add(user);
        }
        return commentRepo.save(comment);
    }
}