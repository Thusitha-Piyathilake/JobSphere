package com.jobsphere.backend.repository;

import com.jobsphere.backend.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository
        extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByJobSeekerId(Long jobSeekerId);

    boolean existsByJobSeekerIdAndJobId(
            Long jobSeekerId,
            Long jobId
    );

    void deleteByJobSeekerIdAndJobId(
            Long jobSeekerId,
            Long jobId
    );
}