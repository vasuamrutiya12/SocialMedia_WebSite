package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Story;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.StoryService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story")
public class StoryController {
    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public Story createStory(@RequestHeader("Authorization")String jwt, @RequestBody Story story) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return storyService.createStory(story, reqUser.getId());
    }

    @GetMapping()
    public List<Story> getAllStroy()throws Exception{
        return storyService.findAllStory();
    }

    @GetMapping("/user/{userId}")
    public List<Story> getStoryByUserId(@PathVariable("userId")Integer userId) throws Exception {
        return storyService.findStoryByUserId(userId);
    }
}
