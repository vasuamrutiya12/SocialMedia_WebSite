package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Post;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.response.ApiResponce;
import com.master.InstagramClone.services.PostService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @PostMapping("/posts/user")
    public ResponseEntity<Post> createdpost(@RequestHeader("Authorization")String jwt,@RequestBody Post post) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post createdPost =  postService.createPost(post,reqUser.getId());
        return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/posts/{postId}/user")
    public ResponseEntity<ApiResponce> deletePost(@RequestHeader("Authorization")String jwt,@PathVariable("postId") Integer postId) throws Exception{
        User reqUser = userService.findUserByJwt(jwt);
        String deletpost = postService.deletePost(postId,reqUser.getId());

        ApiResponce res = new ApiResponce(deletpost,true);
        return new ResponseEntity<ApiResponce>(res,HttpStatus.OK);
    }

    @GetMapping("posts/user/{userId}")
        public ResponseEntity<List<Post>> findPostByUserid(@PathVariable("userId") Integer userId){
        List<Post> posts =  postService.findPostByUserid(userId);
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }

    @GetMapping("posts/{postId}")
    public ResponseEntity<Post> findByPostId(@PathVariable("postId") Integer postId) throws Exception{
        Post post = postService.findByPostId(postId);
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> findAllPost(){
        List<Post> posts = postService.findAllPost();
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }

    @PutMapping("/posts/{postId}/user/savepost")
    public ResponseEntity<Post> savedPost(@RequestHeader("Authorization")String jwt,@PathVariable("postId") Integer postId) throws Exception{
        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.savedPost(postId, reqUser.getId());
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    @PutMapping("/posts/{postId}/user/likepost")
    public ResponseEntity<Post> likePost(@RequestHeader("Authorization")String jwt,@PathVariable("postId") Integer postId) throws Exception{
        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.likepost(postId, reqUser.getId());
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

}
