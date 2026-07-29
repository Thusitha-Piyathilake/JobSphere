package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.JobRequest;
import com.jobsphere.backend.dto.JobResponse;
import com.jobsphere.backend.entity.EmployerProfile;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.repository.EmployerProfileRepository;
import com.jobsphere.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerProfileRepository employerProfileRepository;

    public Job createJob(JobRequest request) {

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .category(request.getCategory())
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

    // =====================================================
    // Convert Job -> JobResponse
    // =====================================================

    private JobResponse mapToResponse(Job job) {

        String logo = "";

        EmployerProfile profile = employerProfileRepository
                .findByEmployerId(job.getEmployerId())
                .orElse(null);

        if (profile != null) {
            logo = profile.getLogoUrl();
        }

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .companyLogo(logo)
                .location(job.getLocation())
                .latitude(job.getLatitude())
                .longitude(job.getLongitude())
                .category(job.getCategory())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .description(job.getDescription())
                .createdAt(job.getCreatedAt())
                .employerId(job.getEmployerId())
                .build();
    }

    // =====================================================
    // GET ALL JOBS
    // =====================================================

    public List<JobResponse> getAllJobs() {

        return jobRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    // =====================================================
    // GET JOBS BY EMPLOYER
    // =====================================================

    public List<JobResponse> getJobsByEmployer(Long employerId) {

        return jobRepository
                .findByEmployerId(employerId)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    // =====================================================
    // GET JOB BY ID
    // =====================================================

    public JobResponse getJobById(Long id) {

        return mapToResponse(

                jobRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Job not found"))

        );

    }

    // =====================================================
    // UPDATE JOB
    // =====================================================

    public Job updateJob(Long id, JobRequest request) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setLatitude(request.getLatitude());
        job.setLongitude(request.getLongitude());
        job.setCategory(request.getCategory());
        job.setSalary(request.getSalary());
        job.setJobType(request.getJobType());
        job.setDescription(request.getDescription());

        return jobRepository.save(job);
    }

    public String deleteJob(Long id) {

        jobRepository.deleteById(id);

        return "Job deleted successfully";

    }

    // =====================================================
    // SEARCH
    // =====================================================

    public List<JobResponse> searchByTitle(String title) {

        return jobRepository
                .findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    public List<JobResponse> searchByLocation(String location) {

        return jobRepository
                .findByLocationContainingIgnoreCase(location)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    public List<JobResponse> searchByJobType(String jobType) {

        return jobRepository
                .findByJobTypeContainingIgnoreCase(jobType)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    public List<JobResponse> searchByTitleAndLocation(
            String title,
            String location
    ) {

        return jobRepository
                .findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
                        title,
                        location
                )
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

}