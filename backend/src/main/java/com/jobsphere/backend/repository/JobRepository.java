package com.jobsphere.backend.repository;

import com.jobsphere.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByEmployerId(Long employerId);
}