package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class JobRequest {

    private String title;
    private String company;
    private String location;
    private Double salary;
    private String jobType;
    private String description;
}