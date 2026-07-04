package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    // Authentication
    private String email;
    private String password;

    // Profile Details
    private String firstName;
    private String lastName;

    private String gender;

    private String homeTown;

    private String cvUrl;

    private Boolean receiveJobAlerts;

    private Boolean termsAccepted;
}