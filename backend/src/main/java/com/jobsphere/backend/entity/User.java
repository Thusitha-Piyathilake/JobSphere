package com.jobsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Authentication
    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    // Job Seeker Profile Information
    private String firstName;

    private String lastName;

    private String gender;

    private String homeTown;

    private String cvUrl;

    @Builder.Default
    private Boolean receiveJobAlerts = false;

    @Builder.Default
    private Boolean termsAccepted = false;

    // Existing logic
    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Builder.Default
    private Boolean enabled = true;
}