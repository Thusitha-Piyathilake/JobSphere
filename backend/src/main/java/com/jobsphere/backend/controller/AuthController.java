package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.LoginRequest;
import com.jobsphere.backend.dto.LoginResponse;
import com.jobsphere.backend.dto.RegisterRequest;
import com.jobsphere.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/jobseeker")
    public String registerJobSeeker(
            @RequestBody RegisterRequest request
    ) {
        return authService.registerJobSeeker(request);
    }

    @PostMapping("/register/employer")
    public String registerEmployer(
            @RequestBody RegisterRequest request
    ) {
        return authService.registerEmployer(request);
    }

    @PostMapping("/register/admin")
    public String registerAdmin(
            @RequestBody RegisterRequest request
    ) {
        return authService.registerAdmin(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}