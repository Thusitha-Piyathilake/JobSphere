package com.jobsphere.backend.repository;

import com.jobsphere.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByEmployerId(Long employerId);

    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByJobTypeContainingIgnoreCase(String jobType);

    List<Job> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
            String title,
            String location
    );
}