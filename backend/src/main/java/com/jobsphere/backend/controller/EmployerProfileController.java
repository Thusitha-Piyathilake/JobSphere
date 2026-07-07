package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.EmployerProfileRequest;
import com.jobsphere.backend.entity.EmployerProfile;
import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.service.EmployerProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employer-profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployerProfileController {

    private final EmployerProfileService employerProfileService;

    @PostMapping
    public EmployerProfile createProfile(@RequestBody EmployerProfileRequest request) {
        return employerProfileService.createProfile(request);
    }

    // ✅ NEW: Get profile for the currently authenticated employer
    @GetMapping("/me")
    public EmployerProfile getMyProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return employerProfileService.getProfile(user.getId());
    }

    @GetMapping("/{employerId}")
    public EmployerProfile getProfile(@PathVariable Long employerId) {
        return employerProfileService.getProfile(employerId);
    }

    @PutMapping("/{employerId}")
    public EmployerProfile updateProfile(
            @PathVariable Long employerId,
            @RequestBody EmployerProfileRequest request) {
        return employerProfileService.updateProfile(employerId, request);
    }
}