package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.JobRequest;
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

    @PostMapping
    public Job createJob(
            @RequestBody JobRequest request
    ) {
        return jobService.createJob(request);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/employer/{employerId}")
    public List<Job> getJobsByEmployer(
            @PathVariable Long employerId
    ) {
        return jobService.getJobsByEmployer(employerId);
    }

    @GetMapping("/{id}")
    public Job getJobById(
            @PathVariable Long id
    ) {
        return jobService.getJobById(id);
    }

    @PutMapping("/{id}")
    public Job updateJob(
            @PathVariable Long id,
            @RequestBody JobRequest request
    ) {
        return jobService.updateJob(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id
    ) {
        return jobService.deleteJob(id);
    }

    // ================= SEARCH ENDPOINTS =================

    @GetMapping("/search/title/{title}")
    public List<Job> searchByTitle(
            @PathVariable String title
    ) {
        return jobService.searchByTitle(title);
    }

    @GetMapping("/search/location/{location}")
    public List<Job> searchByLocation(
            @PathVariable String location
    ) {
        return jobService.searchByLocation(location);
    }

    @GetMapping("/search/type/{jobType}")
    public List<Job> searchByJobType(
            @PathVariable String jobType
    ) {
        return jobService.searchByJobType(jobType);
    }

    @GetMapping("/search/{title}/{location}")
    public List<Job> searchByTitleAndLocation(
            @PathVariable String title,
            @PathVariable String location
    ) {
        return jobService.searchByTitleAndLocation(
                title,
                location
        );
    }
}