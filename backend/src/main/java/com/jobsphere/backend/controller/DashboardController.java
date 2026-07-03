package com.jobsphere.backend.controller;

import com.jobsphere.backend.dto.EmployerDashboardResponse;
import com.jobsphere.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/employer/{employerId}")
    public EmployerDashboardResponse getEmployerDashboard(
            @PathVariable Long employerId
    ) {
        return dashboardService
                .getEmployerDashboard(employerId);
    }
}