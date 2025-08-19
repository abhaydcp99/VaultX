package com.bank.project.controller;

import com.bank.project.dto.*;
import com.bank.project.service.AuthService;
import com.bank.project.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    // Step 1: Send OTP to user (Admin/Clerk/Manager)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO dto) {
        try {
            String result = authService.initiateLogin(dto);
            if (result == null || result.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email/phone or password.");
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email/phone or password.");
        }
    }

    // Step 2: Confirm OTP and generate JWT token
    @PostMapping("/confirm-login")
    public ResponseEntity<?> confirmLogin(@RequestBody ConfirmLoginRequestDTO dto) {
        try {
            LoginResponseDTO response = authService.confirmLogin(dto);
            if (response == null || response.getToken() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid or expired OTP.");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid or expired OTP.");
        }
    }

    // Optional: Resend OTP if needed
    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody EmailDTO request) {
        otpService.resendOtp(request.getEmail());
        return ResponseEntity.ok("OTP resent to email: " + request.getEmail());
    }

    // Optional: Direct OTP validation API (if needed for custom flows)
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean valid = otpService.validateOtp(email, otp);
        return valid
                ? ResponseEntity.ok("OTP verified")
                : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }
}
