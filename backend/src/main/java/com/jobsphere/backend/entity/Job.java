package com.jobsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    // OpenStreetMap coordinates
    private Double latitude;

    private Double longitude;

    private String category;

    private Double salary;

    private String jobType;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime createdAt;

    private Long employerId;
}