package com.jobsphere.backend.controller;

import com.jobsphere.backend.entity.User;
import com.jobsphere.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public User getUser(
            @PathVariable Long id
    ) {
        return userService.getUser(id);
    }

}