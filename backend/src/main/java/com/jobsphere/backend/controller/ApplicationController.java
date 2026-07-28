package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.ApplicationRequest;
import com.jobsphere.backend.dto.ApplicationWithJobDTO;
import com.jobsphere.backend.entity.Application;
import com.jobsphere.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public Application apply(
            @RequestBody ApplicationRequest request
    ) {
        return applicationService.apply(request);
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsForJob(
            @PathVariable Long jobId
    ) {
        return applicationService.getApplicationsForJob(jobId);
    }

    // ✅ CHANGED: now returns DTO with full job details
    @GetMapping("/jobseeker/{jobSeekerId}")
    public List<ApplicationWithJobDTO> getApplicationsForJobSeeker(
            @PathVariable Long jobSeekerId
    ) {
        return applicationService.getApplicationsForJobSeekerWithDetails(jobSeekerId);
    }

    // NEW ENDPOINT
    @GetMapping("/employer/{employerId}")
public List<ApplicationWithJobDTO> getApplicationsForEmployer(
        @PathVariable Long employerId
) {
    return applicationService.getApplicationsForEmployerWithDetails(employerId);
}

    @PutMapping("/{id}/accept")
    public Application acceptApplication(
            @PathVariable Long id
    ) {
        return applicationService.acceptApplication(id);
    }

    @PutMapping("/{id}/reject")
    public Application rejectApplication(
            @PathVariable Long id
    ) {
        return applicationService.rejectApplication(id);
    }
}