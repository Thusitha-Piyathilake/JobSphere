package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.ApplicationRequest;
import com.jobsphere.backend.dto.ApplicationWithJobDTO;
import com.jobsphere.backend.entity.Application;
import com.jobsphere.backend.entity.ApplicationStatus;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.repository.ApplicationRepository;
import com.jobsphere.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public Application apply(ApplicationRequest request) {

        Application application = Application.builder()
                .jobId(request.getJobId())
                .jobSeekerId(request.getJobSeekerId())
                .applicantName(request.getApplicantName())
                .applicantEmail(request.getApplicantEmail())
                .coverLetter(request.getCoverLetter())
                .cvUrl(request.getCvUrl())
                .emailCopy(request.getEmailCopy())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationsForJobSeeker(Long jobSeekerId) {
        return applicationRepository.findByJobSeekerId(jobSeekerId);
    }

    // ✅ NEW METHOD – returns applications with full job details
    public List<ApplicationWithJobDTO> getApplicationsForJobSeekerWithDetails(Long jobSeekerId) {
        List<Application> applications = applicationRepository.findByJobSeekerId(jobSeekerId);

        return applications.stream().map(app -> {
            ApplicationWithJobDTO dto = new ApplicationWithJobDTO();
            dto.setId(app.getId());
            dto.setJobId(app.getJobId());
            dto.setJobSeekerId(app.getJobSeekerId());
            dto.setApplicantName(app.getApplicantName());
            dto.setApplicantEmail(app.getApplicantEmail());
            dto.setCoverLetter(app.getCoverLetter());
            dto.setCvUrl(app.getCvUrl());
            dto.setEmailCopy(app.getEmailCopy());
            dto.setStatus(app.getStatus());
            dto.setAppliedAt(app.getAppliedAt());

            // Fetch job details (nullable)
            Job job = jobRepository.findById(app.getJobId()).orElse(null);
            dto.setJob(job);

            return dto;
        }).collect(Collectors.toList());
    }

    // NEW METHOD
    public List<Application> getApplicationsForEmployer(
            Long employerId
    ) {

        List<Job> jobs =
                jobRepository.findByEmployerId(
                        employerId
                );

        List<Long> jobIds =
                jobs.stream()
                        .map(Job::getId)
                        .toList();

        return applicationRepository.findAll()
                .stream()
                .filter(application ->
                        jobIds.contains(
                                application.getJobId()
                        )
                )
                .toList();
    }

    public Application acceptApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"
                        ));

        application.setStatus(
                ApplicationStatus.ACCEPTED
        );

        return applicationRepository.save(
                application
        );
    }

    // Add this method to ApplicationService.java
public List<ApplicationWithJobDTO> getApplicationsForEmployerWithDetails(Long employerId) {
    List<Job> jobs = jobRepository.findByEmployerId(employerId);
    List<Long> jobIds = jobs.stream().map(Job::getId).toList();

    List<Application> applications = applicationRepository.findAll().stream()
            .filter(app -> jobIds.contains(app.getJobId()))
            .toList();

    return applications.stream().map(app -> {
        ApplicationWithJobDTO dto = new ApplicationWithJobDTO();
        dto.setId(app.getId());
        dto.setJobId(app.getJobId());
        dto.setJobSeekerId(app.getJobSeekerId());
        dto.setApplicantName(app.getApplicantName());
        dto.setApplicantEmail(app.getApplicantEmail());
        dto.setCoverLetter(app.getCoverLetter());
        dto.setCvUrl(app.getCvUrl());
        dto.setEmailCopy(app.getEmailCopy());
        dto.setStatus(app.getStatus());
        dto.setAppliedAt(app.getAppliedAt());

        Job job = jobRepository.findById(app.getJobId()).orElse(null);
        dto.setJob(job);

        return dto;
    }).collect(Collectors.toList());
}

    public Application rejectApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"
                        ));

        application.setStatus(
                ApplicationStatus.REJECTED
        );

        return applicationRepository.save(
                application
        );
    }
}