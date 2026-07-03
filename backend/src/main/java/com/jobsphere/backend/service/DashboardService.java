package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.EmployerDashboardResponse;
import com.jobsphere.backend.entity.ApplicationStatus;
import com.jobsphere.backend.entity.Job;
import com.jobsphere.backend.repository.ApplicationRepository;
import com.jobsphere.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public EmployerDashboardResponse getEmployerDashboard(
            Long employerId
    ) {

        List<Job> jobs =
                jobRepository.findByEmployerId(employerId);

        List<Long> jobIds = jobs.stream()
                .map(Job::getId)
                .toList();

        long totalJobs = jobs.size();

        long totalApplications =
                applicationRepository.countByJobIdIn(jobIds);

        long acceptedApplications =
                applicationRepository.countByJobIdInAndStatus(
                        jobIds,
                        ApplicationStatus.ACCEPTED
                );

        long rejectedApplications =
                applicationRepository.countByJobIdInAndStatus(
                        jobIds,
                        ApplicationStatus.REJECTED
                );

        long pendingApplications =
                applicationRepository.countByJobIdInAndStatus(
                        jobIds,
                        ApplicationStatus.PENDING
                );

        return new EmployerDashboardResponse(
                totalJobs,
                totalApplications,
                acceptedApplications,
                rejectedApplications,
                pendingApplications
        );
    }
}