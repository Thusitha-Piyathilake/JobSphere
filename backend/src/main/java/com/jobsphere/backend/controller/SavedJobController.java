package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.SaveJobRequest;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.entity.SavedJob;
import com.jobsphere.backend.service.SavedJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    // ✅ UPDATED: Return 404 if job not found, otherwise 200 with job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<Job> getJobDetails(
            @PathVariable Long jobId
    ) {
        Job job = savedJobService.getJobDetails(jobId);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }
}