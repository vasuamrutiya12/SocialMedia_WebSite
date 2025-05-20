package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Post;

import java.util.List;
public interface PostService {

    Post createPost(Post post,Integer userid) throws Exception;

    String deletePost(Integer postId,Integer userId) throws Exception;

    List<Post> findPostByUserid(Integer userId);

    Post findByPostId(Integer postId) throws Exception;

    List<Post> findAllPost();

    Post savedPost(Integer postId, Integer userId) throws Exception;

    Post likepost(Integer postId, Integer userId) throws Exception;
}
