package com.jobsphere.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JobResponse {

    private Long id;

    private String title;

    private String company;

    private String companyLogo;

    private String location;

    private Double latitude;

    private Double longitude;

    private String category;

    private Double salary;

    private String jobType;

    private String description;

    private LocalDateTime createdAt;

    private Long employerId;
}