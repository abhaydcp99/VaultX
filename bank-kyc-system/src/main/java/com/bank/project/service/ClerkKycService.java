package com.bank.project.service;

import com.bank.project.dto.ClerkReviewRequest;
import com.bank.project.dto.KycApplicationDTO;
import com.bank.project.entity.KycApplication;
import com.bank.project.entity.User;
import com.bank.project.enums.KycStatus;
import com.bank.project.repository.KycApplicationRepository;
import com.bank.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClerkKycService {

    private final KycApplicationRepository kycRepo;
    private final UserRepository userRepository;

    public List<KycApplicationDTO> getPendingKycApplications(Authentication authentication) {
        List<KycApplication> applications = kycRepo.findByStatus(KycStatus.PENDING);

        return applications.stream().map(kyc -> {
            return KycApplicationDTO.builder()
                .id(kyc.getId())
                .poiDocumentPath(kyc.getPoiDocumentPath())
                .poaDocumentPath(kyc.getPoaDocumentPath())
                .status(kyc.getStatus())
                .remarks(kyc.getRemarks())
                .submittedAt(kyc.getSubmittedAt())
                .accountType(kyc.getAccountType())
                .userId(kyc.getUser() != null ? kyc.getUser().getId() : null)
                .userName(kyc.getUser() != null ? kyc.getUser().getFirstName() + " " + kyc.getUser().getLastName() : null)
                .build();
        }).toList();
    }


    public void forwardToManager(Long applicationId, ClerkReviewRequest request, Authentication authentication) {
        KycApplication kyc = kycRepo.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("KYC not found"));
        
        String username = authentication.getName(); // Email or username of logged-in user
        User clerk = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found")); // ✅ Fixed reference

        kyc.setClerk(clerk);

        kyc.setStatus(KycStatus.CLERK_VERIFIED);
        kyc.getAccountType();
        kyc.setRemarks(
            "Selfie: " + request.isSelfieVerified() +
            ", PoI: " + request.isPoiVerified() +
            ",PoA: " + request.isPoaVerified() +
            ", Liveness: " + request.isLivenessPassed() +
            " Notes: " + request.getNotes()
        );

        kycRepo.save(kyc);
    }
}
