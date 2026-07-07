package com.jobsphere.backend.service;

import com.jobsphere.backend.entity.Role;
import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get one user
    public User getUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    // Block user
    public String blockUser(Long id) {

        User user = getUser(id);

        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin accounts cannot be blocked.");
        }

        user.setEnabled(false);

        userRepository.save(user);

        return "User blocked successfully.";
    }

    // Unblock user
    public String unblockUser(Long id) {

        User user = getUser(id);

        user.setEnabled(true);

        userRepository.save(user);

        return "User unblocked successfully.";
    }

    // Delete user
    public String deleteUser(Long id) {

        User user = getUser(id);

        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin accounts cannot be deleted.");
        }

        userRepository.delete(user);

        return "User deleted successfully.";
    }

}