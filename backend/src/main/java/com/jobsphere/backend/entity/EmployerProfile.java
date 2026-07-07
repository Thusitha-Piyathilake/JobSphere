package com.jobsphere.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employerId;

    private String companyName;

    private String companyEmail;

    private String companyPhone;

    private String industry;

    private String website;

    private String address;

    private String foundedYear;

    private String companySize;

    private String logoUrl;

    private String bannerUrl;

    @Column(columnDefinition = "TEXT")
    private String description;
}