package com.bank.project.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import com.bank.project.dto.AccountInfoDTO;
import com.bank.project.dto.KycUploadRequestDTO;
import com.bank.project.dto.UserRegisterDTO;
import com.bank.project.dto.UserResponseDTO;
import com.bank.project.entity.BankAccount;
import com.bank.project.entity.KycApplication;
import com.bank.project.entity.User;

import com.bank.project.enums.KycStatus;
import com.bank.project.enums.Role;
import com.bank.project.repository.BankAccountRepository;
import com.bank.project.repository.KycApplicationRepository;
import com.bank.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final KycApplicationRepository kycRepository;
    private final BankAccountRepository bankAccountRepository;

    public void registerCustomer(UserRegisterDTO dto) {
        User user = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))    
                .phoneno(dto.getPhoneno())
                .dateOfBirth(dto.getDateOfBirth())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .role(dto.getRole())
                .isVerified(false)
                .build();

        User savedUser = userRepository.save(user);
       
    }
    
    
    public void uploadKycDocumentsForCurrentUser(KycUploadRequestDTO dto) throws IOException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Path uploadDirPath = Paths.get(System.getProperty("user.dir"), "kyc_docs");
        Files.createDirectories(uploadDirPath);

        String poiFileName = uploadDirPath.resolve(System.currentTimeMillis() + "_" + dto.getPoiDocument().getOriginalFilename()).toString();
        String poaFileName = uploadDirPath.resolve(System.currentTimeMillis() + "_" + dto.getPoaDocument().getOriginalFilename()).toString();

        try {
            dto.getPoiDocument().transferTo(new File(poiFileName));
            dto.getPoaDocument().transferTo(new File(poaFileName));
        } catch (IOException e) {
            // rethrow so controller can return readable error
            throw new IOException("Failed to save uploads: " + e.getMessage(), e);
        }


        KycApplication kyc = KycApplication.builder()
                .user(user)
                .accountType(dto.getAccountType())
                .poiDocumentPath(poiFileName)
                .poaDocumentPath(poaFileName)
                .status(KycStatus.PENDING)
                .submittedAt(LocalDateTime.now())
                .build();

        kycRepository.save(kyc);
    }
    
  

    public KycStatus getKycStatus(Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return kycRepository.findTopByUserOrderBySubmittedAtDesc(user)
                .map(KycApplication::getStatus)
                .orElseThrow(() -> new RuntimeException("No KYC application found for user"));
    }
    
    public AccountInfoDTO getAccountInfoByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        BankAccount account = bankAccountRepository.findByUser_Id(user.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        return new AccountInfoDTO(
            account.getAccountNumber(),
            account.getAccountType(),       // ✅ AccountType enum
            account.getBranchName(),
            account.getIfscCode(),
            account.getBalance(),
            account.getKycStatus(),      
            account.getStatus()      // ✅ AccountStatus from BankAccount
        );
    }

    public AccountInfoDTO getAccountInfoByUserId(Long userId) {
        BankAccount account = bankAccountRepository.findByUser_Id(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        return new AccountInfoDTO(
            account.getAccountNumber(),
            account.getAccountType(),       // ✅ AccountType enum
            account.getBranchName(),
            account.getIfscCode(),
            account.getBalance(),
            account.getKycStatus(),         // ✅ KycStatus from BankAccount
            account.getStatus()      // ✅ AccountStatus from BankAccount
        );
    }


    public KycApplication getKycForCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return kycRepository.findByUser(user)
                .orElse(null); // 🟡 Instead of throwing 404
    }
}
