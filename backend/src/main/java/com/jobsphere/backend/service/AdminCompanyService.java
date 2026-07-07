package com.jobsphere.backend.service;

import com.jobsphere.backend.entity.Role;
import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCompanyService {

    private final UserRepository userRepository;

    // Get all employers
    public List<User> getAllCompanies() {

        return userRepository.findByRoleOrderByIdDesc(Role.EMPLOYER);

    }

    // Get one employer
    public User getCompany(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        if (user.getRole() != Role.EMPLOYER) {

            throw new RuntimeException("This user is not an employer.");

        }

        return user;

    }

    // Block employer
    public String blockCompany(Long id) {

        User user = getCompany(id);

        user.setEnabled(false);

        userRepository.save(user);

        return "Company blocked successfully.";

    }

    // Unblock employer
    public String unblockCompany(Long id) {

        User user = getCompany(id);

        user.setEnabled(true);

        userRepository.save(user);

        return "Company unblocked successfully.";

    }

    // Delete employer
    public String deleteCompany(Long id) {

        User user = getCompany(id);

        userRepository.delete(user);

        return "Company deleted successfully.";

    }

}