package com.bank.project.service;

import com.bank.project.entity.OtpEntity;
import com.bank.project.entity.User;
import com.bank.project.repository.OtpRepository;
import com.bank.project.repository.UserRepository;
import com.bank.project.util.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    // Generate 6-digit OTP and save to DB
    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setGeneratedAt(LocalDateTime.now());
        otpEntity.setExpiryAt(LocalDateTime.now().plusMinutes(1));
        otpEntity.setUsed(false);
        otpRepository.save(otpEntity);

        emailService.sendOtpEmail(email, otp);
        return otp;
    }

    public String resendOtp(String email) {
        return generateOtp(email);
    }

    @Transactional
    public boolean validateOtp(String email, String otp) {
        Optional<OtpEntity> optionalOtp = otpRepository.findTopByEmailOrderByGeneratedAtDesc(email);

        if (optionalOtp.isEmpty()) return false;

        OtpEntity otpEntity = optionalOtp.get();

        if (otpEntity.isUsed()) return false;
        if (!otpEntity.getOtp().equals(otp)) return false;
        if (otpEntity.getExpiryAt().isBefore(LocalDateTime.now())) return false;

        // Mark OTP as used
        otpEntity.setUsed(true);
        otpRepository.save(otpEntity);

        // Mark user as verified
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setVerified(true);
            userRepository.save(user);
        }

        return true;
    }
}
