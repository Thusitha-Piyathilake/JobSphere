package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    // Authentication
    private String email;
    private String password;

    // ===============================
    // Job Seeker Fields
    // ===============================
    private String firstName;
    private String lastName;

    private String gender;

    private String homeTown;

    private String cvUrl;

    private Boolean receiveJobAlerts;

    private Boolean termsAccepted;

    // ===============================
    // Employer Fields
    // ===============================
    private String companyName;

    private String companyWebsite;

    private String companyLocation;

    private String industry;

    private String companyDescription;
}