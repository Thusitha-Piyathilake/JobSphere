package com.jobsphere.backend.repository;

import com.jobsphere.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByJobId(Long jobId);

    List<Application> findByJobSeekerId(Long jobSeekerId);
}