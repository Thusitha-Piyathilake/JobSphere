package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class ApplicationRequest {

    private Long jobId;

    private Long jobSeekerId;

    private String applicantName;

    private String applicantEmail;

    private String coverLetter;

    private String cvUrl;

    private Boolean emailCopy;
}