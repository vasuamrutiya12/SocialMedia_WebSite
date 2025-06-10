package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Story;

import java.util.List;


public interface StoryService {

    public Story createStory(Story story,Integer userId) throws Exception;
    public List<Story> findAllStory()throws Exception;
    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
