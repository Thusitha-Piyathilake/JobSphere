package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.JobRequest;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public Job createJob(JobRequest request) {

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())

                // OpenStreetMap coordinates
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())

                .salary(request.getSalary())
                .jobType(request.getJobType())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .employerId(request.getEmployerId())
                .build();

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getJobsByEmployer(Long employerId) {
        return jobRepository.findByEmployerId(employerId);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));
    }

    public Job updateJob(Long id, JobRequest request) {

        Job job = getJobById(id);

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());

        // OpenStreetMap coordinates
        job.setLatitude(request.getLatitude());
        job.setLongitude(request.getLongitude());

        job.setSalary(request.getSalary());
        job.setJobType(request.getJobType());
        job.setDescription(request.getDescription());

        return jobRepository.save(job);
    }

    public String deleteJob(Long id) {

        Job job = getJobById(id);

        jobRepository.delete(job);

        return "Job deleted successfully";
    }

    // ================= SEARCH FEATURES =================

    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Job> searchByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Job> searchByJobType(String jobType) {
        return jobRepository.findByJobTypeContainingIgnoreCase(jobType);
    }

    public List<Job> searchByTitleAndLocation(
            String title,
            String location
    ) {
        return jobRepository
                .findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
                        title,
                        location
                );
    }
}