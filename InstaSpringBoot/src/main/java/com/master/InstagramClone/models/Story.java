package com.master.InstagramClone.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String img;
    private String video;
    private String caption;
    private LocalDateTime timeStamp;

    @ManyToOne
    private User user;
}
