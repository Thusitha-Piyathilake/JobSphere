package com.jobsphere.backend.dto;

import com.jobsphere.backend.entity.ApplicationStatus;
import com.jobsphere.backend.entity.Job;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicationWithJobDTO {
    private Long id;
    private Long jobId;
    private Long jobSeekerId;
    private String applicantName;
    private String applicantEmail;
    private String coverLetter;
    private String cvUrl;
    private Boolean emailCopy;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

    // Full job details (nullable if job deleted)
    private Job job;
}