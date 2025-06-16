package com.master.InstagramClone.controllers;

import com.master.InstagramClone.models.Reels;
import com.master.InstagramClone.models.User;
import com.master.InstagramClone.services.ReelsService;
import com.master.InstagramClone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
public class ReelsController {

    @Autowired
    private ReelsService reelsService;
    @Autowired
    private UserService userService;

    @PostMapping()
    public Reels createReels(@RequestHeader("Authorization")String jwt,@RequestBody Reels reels){
        User reqUser = userService.findUserByJwt(jwt);
        Reels createReels = reelsService.createReel(reels,reqUser);
        return createReels;
    }

    @GetMapping()
    public List<Reels> getAllReels(){
        return reelsService.findAllReels();
    }

    @GetMapping("/user/{userId}")
    public List<Reels> getReelsByUserId(@PathVariable("userId")Integer userId) throws Exception {
        return reelsService.findUserReel(userId);
    }
}
