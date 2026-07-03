package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class ApplicationRequest {

    private Long jobId;

    private Long jobSeekerId;

    private String cvUrl;
}