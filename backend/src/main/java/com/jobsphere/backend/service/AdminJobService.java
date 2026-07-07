package com.jobsphere.backend.service;

import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminJobService {

    private final JobRepository jobRepository;

    public List<Job> getAllJobs() {

        return jobRepository.findAllByOrderByCreatedAtDesc();

    }

    public Job getJob(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

    }

    public String deleteJob(Long id) {

        Job job = getJob(id);

        jobRepository.delete(job);

        return "Job deleted successfully.";

    }

}