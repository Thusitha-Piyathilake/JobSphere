package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.ApplicationRequest;
import com.jobsphere.backend.entity.Application;
import com.jobsphere.backend.entity.ApplicationStatus;
import com.jobsphere.backend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public Application apply(ApplicationRequest request) {

        Application application = Application.builder()
                .jobId(request.getJobId())
                .jobSeekerId(request.getJobSeekerId())
                .cvUrl(request.getCvUrl())
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

    public Application acceptApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.ACCEPTED);

        return applicationRepository.save(application);
    }

    public Application rejectApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.REJECTED);

        return applicationRepository.save(application);
    }
}