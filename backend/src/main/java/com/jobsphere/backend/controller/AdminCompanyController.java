package com.jobsphere.backend.controller;

import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.service.AdminCompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminCompanyController {

    private final AdminCompanyService adminCompanyService;

    // Get all companies
    @GetMapping
    public List<User> getAllCompanies() {

        return adminCompanyService.getAllCompanies();

    }

    // Get one company
    @GetMapping("/{id}")
    public User getCompany(
            @PathVariable Long id
    ) {

        return adminCompanyService.getCompany(id);

    }

    // Block company
    @PutMapping("/{id}/block")
    public String blockCompany(
            @PathVariable Long id
    ) {

        return adminCompanyService.blockCompany(id);

    }

    // Unblock company
    @PutMapping("/{id}/unblock")
    public String unblockCompany(
            @PathVariable Long id
    ) {

        return adminCompanyService.unblockCompany(id);

    }

    // Delete company
    @DeleteMapping("/{id}")
    public String deleteCompany(
            @PathVariable Long id
    ) {

        return adminCompanyService.deleteCompany(id);

    }

}