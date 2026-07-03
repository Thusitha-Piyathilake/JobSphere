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
}