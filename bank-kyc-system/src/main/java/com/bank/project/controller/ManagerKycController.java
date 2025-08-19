package com.bank.project.controller;

import com.bank.project.dto.ManagerKycDecisionDTO;
import com.bank.project.entity.KycApplication;
import com.bank.project.service.ManagerKycService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
@RequiredArgsConstructor
public class ManagerKycController {

    private final ManagerKycService managerKycService;

    //  View pending clerk-verified KYC
    @GetMapping("/pending-kyc")
    public ResponseEntity<List<KycApplication>> getPendingKycApplications() {
        return ResponseEntity.ok(managerKycService.getPendingApplications());
    }

    //  View full KYC details
    @GetMapping("/kyc/{id}")
    public ResponseEntity<KycApplication> getKycById(@PathVariable Long id) {
        return ResponseEntity.ok(managerKycService.getKycById(id));
    }

    //  Accept or Reject KYC
    @PostMapping("/review/{id}")
    public ResponseEntity<String> reviewKyc(@PathVariable Long id, @RequestBody ManagerKycDecisionDTO dto) {
        managerKycService.reviewKyc(id, dto);
        return ResponseEntity.ok("KYC reviewed successfully");
    }
    
    
    
    @GetMapping("/approved-kycs")
    public ResponseEntity<List<KycApplication>> getApprovedKycs() {
        return ResponseEntity.ok(managerKycService.getApprovedKycs());
    }

    // ✅ New: View Rejected KYCs
    @GetMapping("/rejected-kycs")
    public ResponseEntity<List<KycApplication>> getRejectedKycs() {
        return ResponseEntity.ok(managerKycService.getRejectedKycs());
    }
}
