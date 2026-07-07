package com.jobsphere.backend.controller;

import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.service.AdminJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminJobController {

    private final AdminJobService adminJobService;

    @GetMapping
    public List<Job> getAllJobs() {

        return adminJobService.getAllJobs();

    }

    @GetMapping("/{id}")
    public Job getJob(
            @PathVariable Long id
    ) {

        return adminJobService.getJob(id);

    }

    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id
    ) {

        return adminJobService.deleteJob(id);

    }

}