package com.jobsphere.backend.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    // ==========================================
    // Upload Job Seeker CV
    // ==========================================

    public String uploadCv(MultipartFile file) {

        try {

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                            "folder", "jobsphere/cvs",
                            "resource_type", "raw"
                    )
            );

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to upload CV",
                    e
            );

        }

    }

    // ==========================================
    // Upload Company Logo
    // ==========================================

    public String uploadCompanyLogo(MultipartFile file) {

        try {

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                            "folder", "jobsphere/company-logos",
                            "resource_type", "image"
                    )
            );

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to upload company logo",
                    e
            );

        }

    }

}