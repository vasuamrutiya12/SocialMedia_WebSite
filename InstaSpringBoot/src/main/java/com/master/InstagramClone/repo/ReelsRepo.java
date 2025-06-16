package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelsRepo extends JpaRepository<Reels,Integer> {

    public List<Reels> findByUserId(Integer userId);
}
