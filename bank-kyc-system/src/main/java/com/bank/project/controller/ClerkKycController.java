package com.bank.project.controller;

import com.bank.project.dto.ClerkReviewRequest;
import com.bank.project.dto.KycApplicationDTO;
import com.bank.project.entity.KycApplication;
import com.bank.project.service.ClerkKycService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/clerk/kyc")
@PreAuthorize("hasRole('CLERK')")
@RequiredArgsConstructor
public class ClerkKycController {

	@Autowired
	private ClerkKycService clerkKycService;


    // 1. Get all pending KYC applications
	@GetMapping("/pending")
	public ResponseEntity<List<KycApplicationDTO>> getPendingApplications(Authentication authentication) {
	    return ResponseEntity.ok(clerkKycService.getPendingKycApplications(authentication));
	}
	// KycController.java


    // 2. Forward application to manager after review
    @PostMapping("/forward/{applicationId}")
    public ResponseEntity<String> forwardToManager(
            @PathVariable Long applicationId,
            @RequestBody @Valid ClerkReviewRequest reviewRequest,
            Authentication authentication) {

        clerkKycService.forwardToManager(applicationId, reviewRequest, authentication);
        return ResponseEntity.ok("Application forwarded to manager for review.");
    }   
}
