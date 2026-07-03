package com.jobsphere.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployerDashboardResponse {

    private long totalJobs;

    private long totalApplications;

    private long acceptedApplications;

    private long rejectedApplications;

    private long pendingApplications;
}