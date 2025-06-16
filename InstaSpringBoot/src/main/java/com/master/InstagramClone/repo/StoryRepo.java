package com.master.InstagramClone.repo;

import com.master.InstagramClone.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepo extends JpaRepository<Story,Integer> {

    public List<Story> findByUserId(Integer userId);
}
