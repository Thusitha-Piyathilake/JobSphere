package com.jobsphere.backend.controller;

import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminUserController {

    private final AdminUserService adminUserService;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {

        return adminUserService.getAllUsers();
    }

    // Get one user
    @GetMapping("/{id}")
    public User getUser(
            @PathVariable Long id
    ) {

        return adminUserService.getUser(id);
    }

    // Block user
    @PutMapping("/{id}/block")
    public String blockUser(
            @PathVariable Long id
    ) {

        return adminUserService.blockUser(id);
    }

    // Unblock user
    @PutMapping("/{id}/unblock")
    public String unblockUser(
            @PathVariable Long id
    ) {

        return adminUserService.unblockUser(id);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        return adminUserService.deleteUser(id);
    }

}