package com.master.InstagramClone.services;

import com.master.InstagramClone.models.Reels;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.repo.ReelsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class reelsServiceImplementation implements ReelsService{

    @Autowired
    private ReelsRepo reelsRepo;
    @Autowired
    private UserService userService;
    @Override
    public Reels createReel(Reels reels, User user) {

        Reels createReel = new Reels();

        createReel.setUser(user);
        createReel.setVideo(reels.getVideo());
        createReel.setTitle(reels.getTitle());

        return reelsRepo.save(createReel);
    }

    @Override
    public List<Reels> findAllReels() {
        return reelsRepo.findAll();
    }

    @Override
    public List<Reels> findUserReel(Integer userId) throws Exception {
        userService.findUserById(userId);
        return reelsRepo.findByUserId(userId);
    }
}
