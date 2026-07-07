package com.jobsphere.backend.service;

import com.jobsphere.backend.dto.EmployerProfileRequest;
import com.jobsphere.backend.entity.EmployerProfile;
import com.jobsphere.backend.repository.EmployerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployerProfileService {

    private final EmployerProfileRepository employerProfileRepository;

    public EmployerProfile createProfile(
            EmployerProfileRequest request
    ) {

        EmployerProfile profile = EmployerProfile.builder()
                .employerId(request.getEmployerId())
                .companyName(request.getCompanyName())
                .companyEmail(request.getCompanyEmail())
                .companyPhone(request.getCompanyPhone())
                .industry(request.getIndustry())
                .website(request.getWebsite())
                .address(request.getAddress())
                .foundedYear(request.getFoundedYear())
                .companySize(request.getCompanySize())
                .logoUrl(request.getLogoUrl())
                .bannerUrl(request.getBannerUrl())
                .description(request.getDescription())
                .build();

        return employerProfileRepository.save(profile);
    }

    public EmployerProfile getProfile(
            Long employerId
    ) {

        return employerProfileRepository
                .findByEmployerId(employerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employer profile not found"
                        )
                );
    }

    public EmployerProfile updateProfile(
            Long employerId,
            EmployerProfileRequest request
    ) {

        EmployerProfile profile =
                getProfile(employerId);

        profile.setCompanyName(
                request.getCompanyName()
        );

        profile.setCompanyEmail(
                request.getCompanyEmail()
        );

        profile.setCompanyPhone(
                request.getCompanyPhone()
        );

        profile.setIndustry(
                request.getIndustry()
        );

        profile.setWebsite(
                request.getWebsite()
        );

        profile.setAddress(
                request.getAddress()
        );

        profile.setFoundedYear(
                request.getFoundedYear()
        );

        profile.setCompanySize(
                request.getCompanySize()
        );

        profile.setLogoUrl(
                request.getLogoUrl()
        );

        profile.setBannerUrl(
                request.getBannerUrl()
        );

        profile.setDescription(
                request.getDescription()
        );

        return employerProfileRepository.save(
                profile
        );
    }
}