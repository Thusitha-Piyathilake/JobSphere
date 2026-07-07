package com.jobsphere.backend.dto;

import lombok.Data;

@Data
public class EmployerProfileRequest {

    private Long employerId;

    private String companyName;

    private String companyEmail;

    private String companyPhone;

    private String industry;

    private String website;

    private String address;

    private String foundedYear;

    private String companySize;

    private String logoUrl;

    private String bannerUrl;

    private String description;
}