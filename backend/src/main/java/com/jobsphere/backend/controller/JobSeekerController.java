package com.jobsphere.backend.controller;

import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobseekers")
@RequiredArgsConstructor
public class JobSeekerController {

    private final UserRepository userRepository;


    @PutMapping("/{id}")
public User updateJobSeeker(
        @PathVariable Long id,
        @RequestBody User updatedUser) {
    User existing = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job seeker not found"));
    // Update only the fields that are allowed to change
    existing.setFirstName(updatedUser.getFirstName());
    existing.setLastName(updatedUser.getLastName());
    // Do not update email, password, etc.
    return userRepository.save(existing);
}

    @GetMapping("/{id}")
    public User getJobSeeker(
            @PathVariable Long id
    ) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job seeker not found"
                        )
                );
    }
}