package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Story;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.StoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class storyServiceImplementation implements StoryService{

    @Autowired
    private StoryRepo storyRepo;

    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, Integer userId) throws Exception {

        User user = userService.findUserById(userId);
        Story createdStory = new Story();

        createdStory.setUser(user);
        createdStory.setImg(story.getImg());
        createdStory.setVideo(story.getVideo());
        createdStory.setCaption(story.getCaption());
        createdStory.setTimeStamp(LocalDateTime.now());

        return storyRepo.save(createdStory);
    }

    @Override
    public List<Story> findAllStory() throws Exception {
        return storyRepo.findAll();
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return storyRepo.findByUserId(userId);
    }
}
