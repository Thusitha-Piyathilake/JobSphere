package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.JobRequest;
import com.jobsphere.backend.dto.JobResponse;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // ==========================================
    // CREATE JOB
    // ==========================================

    @PostMapping
    public Job createJob(
            @RequestBody JobRequest request
    ) {
        return jobService.createJob(request);
    }

    // ==========================================
    // GET ALL JOBS
    // ==========================================

    @GetMapping
    public List<JobResponse> getAllJobs() {
        return jobService.getAllJobs();
    }

    // ==========================================
    // GET EMPLOYER JOBS
    // ==========================================

    @GetMapping("/employer/{employerId}")
    public List<JobResponse> getJobsByEmployer(
            @PathVariable Long employerId
    ) {
        return jobService.getJobsByEmployer(employerId);
    }

    // ==========================================
    // GET JOB BY ID
    // ==========================================

    @GetMapping("/{id}")
    public JobResponse getJobById(
            @PathVariable Long id
    ) {
        return jobService.getJobById(id);
    }

    // ==========================================
    // UPDATE JOB
    // ==========================================

    @PutMapping("/{id}")
    public Job updateJob(
            @PathVariable Long id,
            @RequestBody JobRequest request
    ) {
        return jobService.updateJob(id, request);
    }

    // ==========================================
    // DELETE JOB
    // ==========================================

    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id
    ) {
        return jobService.deleteJob(id);
    }

    // ==========================================
    // SEARCH BY TITLE
    // ==========================================

    @GetMapping("/search/title/{title}")
    public List<JobResponse> searchByTitle(
            @PathVariable String title
    ) {
        return jobService.searchByTitle(title);
    }

    // ==========================================
    // SEARCH BY LOCATION
    // ==========================================

    @GetMapping("/search/location/{location}")
    public List<JobResponse> searchByLocation(
            @PathVariable String location
    ) {
        return jobService.searchByLocation(location);
    }

    // ==========================================
    // SEARCH BY JOB TYPE
    // ==========================================

    @GetMapping("/search/type/{jobType}")
    public List<JobResponse> searchByJobType(
            @PathVariable String jobType
    ) {
        return jobService.searchByJobType(jobType);
    }

    // ==========================================
    // SEARCH BY TITLE + LOCATION
    // ==========================================

    @GetMapping("/search/{title}/{location}")
    public List<JobResponse> searchByTitleAndLocation(
            @PathVariable String title,
            @PathVariable String location
    ) {
        return jobService.searchByTitleAndLocation(
                title,
                location
        );
    }
}