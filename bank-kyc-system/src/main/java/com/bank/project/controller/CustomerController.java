package com.bank.project.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.project.dto.AccountInfoDTO;
import com.bank.project.dto.KycUploadRequestDTO;
import com.bank.project.dto.UserRegisterDTO;
import com.bank.project.entity.KycApplication;
import com.bank.project.enums.Role;
import com.bank.project.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService ;
   
    @PostMapping("/register-customer")
    public ResponseEntity<String> registerCustomer(@RequestBody @Valid UserRegisterDTO dto) {
        dto.setRole(Role.CUSTOMER); 
        customerService.registerCustomer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Customer registered successfully");
    }

//    @PostMapping("/upload-kyc")
//    public ResponseEntity<String> uploadKyc(
//            @RequestParam Long userId,
//            @ModelAttribute KycUploadRequestDTO dto) throws IllegalStateException, IOException {
//        
//        customerService.uploadKycDocuments(userId, dto);
//        return ResponseEntity.ok("KYC documents uploaded successfully");
//    }
   
    @PostMapping("/upload-kyc")
    public ResponseEntity<String> uploadKyc(@ModelAttribute KycUploadRequestDTO dto) throws IOException {
        customerService.uploadKycDocumentsForCurrentUser(dto);
        return ResponseEntity.ok("KYC documents uploaded successfully");
    }

//    @GetMapping("/account")
//    public ResponseEntity<AccountInfoDTO> getAccountInfo(@RequestHeader("email") String email) {
//        AccountInfoDTO dto = customerService.getAccountInfo(email);
//        return ResponseEntity.ok(dto);
//    }
//    

    @GetMapping("/account")
    public ResponseEntity<AccountInfoDTO> getAccountInfo(Authentication authentication) {
        String email = authentication.getName();
        AccountInfoDTO dto = customerService.getAccountInfoByEmail(email); // ✅ corrected
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/account/{userId}")
    public ResponseEntity<AccountInfoDTO> getAccountInfoByUserId(@PathVariable Long userId) {
        AccountInfoDTO dto = customerService.getAccountInfoByUserId(userId);
        return ResponseEntity.ok(dto);
    }

 
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/self")
    public ResponseEntity<KycApplication> getOwnKyc() {
        return ResponseEntity.ok(customerService.getKycForCurrentUser());
    }

   

}
