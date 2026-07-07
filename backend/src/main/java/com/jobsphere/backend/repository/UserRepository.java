package com.jobsphere.backend.repository;

import com.jobsphere.backend.entity.Role;
import com.jobsphere.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<User> findById(Long id);

    // ==========================
    // Admin Companies
    // ==========================

    List<User> findByRole(Role role);

    List<User> findByRoleOrderByIdDesc(Role role);

}