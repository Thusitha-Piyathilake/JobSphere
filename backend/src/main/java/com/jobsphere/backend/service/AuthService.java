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

                .companyName(request.getCompanyName())
                .companyWebsite(request.getCompanyWebsite())
                .companyLocation(request.getCompanyLocation())
                .industry(request.getIndustry())
                .companyDescription(request.getCompanyDescription())

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

        System.out.println("======================================");
        System.out.println("LOGIN DEBUG");
        System.out.println("User Found      : " + user.getEmail());
        System.out.println("Role            : " + user.getRole());
        System.out.println("Enabled         : " + user.getEnabled());
        System.out.println("Provider        : " + user.getProvider());
        System.out.println("Entered Password: " + request.getPassword());
        System.out.println("Stored Password : " + user.getPassword());

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        System.out.println("Password Matches: " + matches);
        System.out.println("======================================");

        if (!matches) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        System.out.println("LOGIN SUCCESS");
        System.out.println("Generated Role : " + user.getRole().name());
        System.out.println("======================================");

        return new LoginResponse(
                token,
                user.getRole().name(),
                user.getId()
        );
    }
}