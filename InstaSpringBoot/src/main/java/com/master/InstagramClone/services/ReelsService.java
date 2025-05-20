package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Reels;
import com.master.InstagramClone.models.User;

import java.util.List;

public interface ReelsService {

    public Reels createReel(Reels reels, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUserReel(Integer userId) throws Exception;
}
