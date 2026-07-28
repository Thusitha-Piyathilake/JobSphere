package com.jobsphere.backend.controller;

import com.jobsphere.backend.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UploadController {

    private final CloudinaryService cloudinaryService;

    // ==========================================
    // Upload Job Seeker CV
    // ==========================================

    @PostMapping("/cv")
    public ResponseEntity<?> uploadCv(
            @RequestParam("file") MultipartFile file
    ) {

        String url = cloudinaryService.uploadCv(file);

        return ResponseEntity.ok(
                Map.of(
                        "url", url
                )
        );
    }

    // ==========================================
    // Upload Company Logo
    // ==========================================

    @PostMapping("/company-logo")
    public ResponseEntity<?> uploadCompanyLogo(
            @RequestParam("file") MultipartFile file
    ) {

        String url = cloudinaryService.uploadCompanyLogo(file);

        return ResponseEntity.ok(
                Map.of(
                        "url", url
                )
        );
    }
}