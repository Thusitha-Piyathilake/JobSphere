package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.SaveJobRequest;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.entity.SavedJob;
import com.jobsphere.backend.repository.JobRepository;
import com.jobsphere.backend.repository.SavedJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;

    public String saveJob(SaveJobRequest request) {

        boolean alreadySaved =
                savedJobRepository.existsByJobSeekerIdAndJobId(
                        request.getJobSeekerId(),
                        request.getJobId()
                );

        if (alreadySaved) {
            return "Job already saved";
        }

        SavedJob savedJob = SavedJob.builder()
                .jobSeekerId(request.getJobSeekerId())
                .jobId(request.getJobId())
                .savedAt(LocalDateTime.now())
                .build();

        savedJobRepository.save(savedJob);

        return "Job saved successfully";
    }

    public List<SavedJob> getSavedJobs(Long jobSeekerId) {
        return savedJobRepository.findByJobSeekerId(jobSeekerId);
    }

    public void removeSavedJob(
            Long jobSeekerId,
            Long jobId
    ) {
        savedJobRepository.deleteByJobSeekerIdAndJobId(
                jobSeekerId,
                jobId
        );
    }

    public Job getJobDetails(Long jobId) {

        return jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));
    }
}