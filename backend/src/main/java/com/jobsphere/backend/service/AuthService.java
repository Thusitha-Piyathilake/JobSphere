package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.LoginRequest;
import com.jobsphere.backend.dto.LoginResponse;
import com.jobsphere.backend.dto.RegisterRequest;
import com.jobsphere.backend.entity.AuthProvider;
import com.jobsphere.backend.entity.Role;
import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.repository.UserRepository;
import com.jobsphere.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String registerJobSeeker(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))

                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .gender(request.getGender())
                .homeTown(request.getHomeTown())
                .cvUrl(request.getCvUrl())

                .receiveJobAlerts(
                        request.getReceiveJobAlerts() != null
                                ? request.getReceiveJobAlerts()
                                : false
                )

                .termsAccepted(
                        request.getTermsAccepted() != null
                                ? request.getTermsAccepted()
                                : false
                )

                .role(Role.JOB_SEEKER)
                .provider(AuthProvider.LOCAL)
                .enabled(true)
                .build();

        userRepository.save(user);

        return "Job seeker registered successfully";
    }

    public String registerEmployer(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))

                .firstName(request.getFirstName())
                .lastName(request.getLastName())

                .role(Role.EMPLOYER)
                .provider(AuthProvider.LOCAL)
                .enabled(true)
                .build();

        userRepository.save(user);

        return "Employer registered successfully";
    }

    public String registerAdmin(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))

                .firstName(request.getFirstName())
                .lastName(request.getLastName())

                .role(Role.ADMIN)
                .provider(AuthProvider.LOCAL)
                .enabled(true)
                .build();

        userRepository.save(user);

        return "Admin registered successfully";
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getRole().name()
        );
    }
}