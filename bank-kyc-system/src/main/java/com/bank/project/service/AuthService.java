
package com.bank.project.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.project.dto.ConfirmLoginRequestDTO;
import com.bank.project.dto.LoginRequestDTO;
import com.bank.project.dto.LoginResponseDTO;
import com.bank.project.dto.OtpVerificationRequestDTO;
import com.bank.project.dto.RegisterRequestDTO;
import com.bank.project.dto.UserRegisterDTO;
import com.bank.project.entity.User;
import com.bank.project.enums.Role;
import com.bank.project.repository.UserRepository;

import com.bank.project.util.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final OtpService otpService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // Register new customer and send OTP
//    public String register(UserRegisterDTO dto) {
//        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
//            throw new RuntimeException("Email already registered");
//        }
//
//        User user = User.builder()
//                .firstName(dto.getFirstName())
//                .lastName(dto.getLastName())
//                .email(dto.getEmail())
//                .password(passwordEncoder.encode(dto.getPassword()))
//                .dateOfBirth(dto.getDateOfBirth())
//                .address(dto.getAddress())
//                .city(dto.getCity())
//                .state(dto.getState())
//                .pincode(dto.getPincode())
//                .role(Role.CUSTOMER)
//                .isVerified(false)
//                .build();
//
//        userRepository.save(user);
//
//        // Generate & send OTP using new service
//        otpService.generateOtp(user.getEmail());
//
//        return "OTP sent to email. Please verify.";
//    }

    // OTP verification
    public String verifyOtp(OtpVerificationRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean valid = otpService.validateOtp(dto.getEmail(), dto.getOtp());

        if (!valid) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        user.setVerified(true);
        userRepository.save(user);

        return "OTP verified successfully";
    }

    // Login phase 1: password check and OTP send
    public String initiateLogin(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        otpService.generateOtp(user.getEmail());
        return "OTP sent to email";
    }


    
    public LoginResponseDTO confirmLogin(ConfirmLoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        boolean validOtp = otpService.validateOtp(dto.getEmail(), dto.getOtp());
        if (!validOtp) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponseDTO(
            token,
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole().name()
        );
    }


    
    
}
