package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class SaveJobRequest {

    private Long jobSeekerId;

    private Long jobId;
}