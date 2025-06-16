package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Comment;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.CommentService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/post/{postId}")
    public Comment createComment(
            @RequestBody Comment comment,
            @RequestHeader("Authorization")String jwt,
            @PathVariable("postId")Integer postId) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);

        Comment createdComment = commentService.createComment(comment,postId, reqUser.getId());
        return createdComment;
    }

    @PutMapping("/like/{id}")
    public Comment likeComment(@RequestHeader("Authorization")String jwt,@PathVariable Integer id) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        System.out.println(reqUser.getFirstName());
        Comment likeComment = commentService.likeComment(id, reqUser.getId());
        return likeComment;
    }
}

