package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.SaveJobRequest;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.entity.SavedJob;
import com.jobsphere.backend.service.SavedJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SavedJobController {

    private final SavedJobService savedJobService;

    @PostMapping
    public String saveJob(
            @RequestBody SaveJobRequest request
    ) {
        return savedJobService.saveJob(request);
    }

    @GetMapping("/{jobSeekerId}")
    public List<SavedJob> getSavedJobs(
            @PathVariable Long jobSeekerId
    ) {
        return savedJobService.getSavedJobs(jobSeekerId);
    }

    @DeleteMapping("/{jobSeekerId}/{jobId}")
    public void removeSavedJob(
            @PathVariable Long jobSeekerId,
            @PathVariable Long jobId
    ) {
        savedJobService.removeSavedJob(
                jobSeekerId,
                jobId
        );
    }

    @GetMapping("/job/{jobId}")
    public Job getJobDetails(
            @PathVariable Long jobId
    ) {
        return savedJobService.getJobDetails(jobId);
    }
}