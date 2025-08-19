package com.bank.project.service;

import com.bank.project.dto.ManagerKycDecisionDTO;
import com.bank.project.entity.BankAccount;
import com.bank.project.entity.KycApplication;
import com.bank.project.entity.User;
import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;
import com.bank.project.repository.BankAccountRepository;
import com.bank.project.repository.KycApplicationRepository;
import com.bank.project.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ManagerKycService {

    private final KycApplicationRepository kycRepo;
    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepo;
    private final JavaMailSender mailSender;

    // ✅ Fetch only clerk-verified KYC
    public List<KycApplication> getPendingApplications() {
        return kycRepo.findByStatusAndClerkIsNotNullAndManagerIsNull(KycStatus.CLERK_VERIFIED);
    }

    public KycApplication getKycById(Long id) {
        return kycRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("KYC application not found"));
    }

    @Transactional
    public void reviewKyc(Long kycId, ManagerKycDecisionDTO dto) {
        KycApplication kyc = getKycById(kycId); // fetch the KYC record

        // ✅ Require remarks if rejected
        if (!dto.isApproved() && (dto.getRemarks() == null || dto.getRemarks().isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejection reason is required");
        }

        // ✅ Fetch manager user entity
        User manager = userRepository.findById(dto.getManagerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));

        kyc.setManager(manager);
        kyc.setRemarks(dto.getRemarks());
        kyc.setStatus(dto.isApproved() ? KycStatus.APPROVED : KycStatus.REJECTED);
      
        kycRepo.save(kyc);

        if (dto.isApproved()) {
        	createBankAccountAndNotify(kyc.getUser());
        }
    }

    // ✅ Generate bank account + send email
//    private void createBankAccountAndNotify(User user) {
//        Optional<BankAccount> existing = bankAccountRepo.findByUser(user);
//        if (existing.isPresent()) return; // avoid duplicate accounts
//
//        String accountNumber = "AC" + System.currentTimeMillis();
//        String branch = "Mumbai Branch";
//        String ifsc = "BANK0001234";
//        BigDecimal initialBalance = new BigDecimal("0.0000000");
//
//        BankAccount account = BankAccount.builder()
//                .accountNumber(accountNumber)
//                .accountType(user.getAccountType())
//                .status(AccountStatus.ACTIVE)
//                .branchName(branch)
//                .ifscCode(ifsc)   
//                .balance(initialBalance)
//                .user(user)
//                .build();
//
//        bankAccountRepo.save(account);
//
//        // 📧 Send account info email
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(user.getEmail());
//        message.setSubject("Bank Account Approved");
//
//        message.setText("Dear " + user.getFirstName() + ",\n\n" +
//                "Congratulations! Your KYC is approved and your bank account has been created.\n\n" +
//                "Account Number: " + accountNumber + "\n" +
//                "Account Type: " + user.getAccountType() + "\n" +
//                "Account Status: ACTIVE\n" +
//                "IFSC Code: " + ifsc + "\n" +
//                "Branch: " + branch + "\n\n" +
//                "Thank you,\nBank Team");
//
//        mailSender.send(message);
//    }

    private void createBankAccountAndNotify(User user) {
        Optional<BankAccount> existing = bankAccountRepo.findByUser(user);
        if (existing.isPresent()) return; // Avoid duplicate accounts

        // ✅ Fetch latest APPROVED KYC for this user
        KycApplication approvedKyc = kycRepo.findTopByUserAndStatusOrderBySubmittedAtDesc(user, KycStatus.APPROVED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No approved KYC found for user"));

        String accountNumber = "AC" + System.currentTimeMillis();
        String branch = "Mumbai Branch";
        String ifsc = "BANK0001234";
        BigDecimal initialBalance = BigDecimal.ZERO;

        BankAccount account = BankAccount.builder()
                .accountNumber(accountNumber)
                .accountType(approvedKyc.getAccountType())   // ✅ Corrected
                .kycStatus(KycStatus.APPROVED)
                .status(AccountStatus.ACTIVE)
                .branchName(branch)
                .ifscCode(ifsc)
                .balance(initialBalance)
                .user(user)
                .build();

        bankAccountRepo.save(account);

        // 📧 Email notification
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Bank Account Approved");
        message.setText("Dear " + user.getFirstName() + ",\n\n" +
                "Congratulations! Your KYC is approved and your bank account has been created.\n\n" +
                "Account Number: " + accountNumber + "\n" +
                "Account Type: " + approvedKyc.getAccountType() + "\n" +
                "Account Status: ACTIVE\n" +
                "IFSC Code: " + ifsc + "\n" +
                "Branch: " + branch + "\n\n" +
                "Thank you,\nBank Team");

        mailSender.send(message);
    }

    // ✅ New: Get Approved KYC Applications
    public List<KycApplication> getApprovedKycs() {
        return kycRepo.findByStatus(KycStatus.APPROVED);
    }

    // ✅ New: Get Rejected KYC Applications
    public List<KycApplication> getRejectedKycs() {
        return kycRepo.findByStatus(KycStatus.REJECTED);
    }
}
