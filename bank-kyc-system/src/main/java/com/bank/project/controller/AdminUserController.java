package com.bank.project.controller;

import com.bank.project.dto.BankAccountSummaryDTO;
import com.bank.project.dto.UserRegisterDTO;
import com.bank.project.dto.UserResponseDTO;
import com.bank.project.entity.AuditLog;
import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.Role;
import com.bank.project.service.AdminUserService;
import com.bank.project.service.AuditLogService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@CrossOrigin
public class AdminUserController {

    private final AdminUserService userService;
    private final AuditLogService auditLogService;
    // Clerk endpoints
    @PostMapping("/clerk")
    public ResponseEntity<UserResponseDTO> registerClerk(@Valid @RequestBody UserRegisterDTO dto) {
        dto.setRole(Role.CLERK);
        return ResponseEntity.ok(userService.register(dto));
    }

    @GetMapping("/clerks")
    public ResponseEntity<List<UserResponseDTO>> getAllClerks() {
        return ResponseEntity.ok(userService.getAllByRole(Role.CLERK));
    }

    @PutMapping("/clerk/{id}")
    public ResponseEntity<UserResponseDTO> updateClerk(@PathVariable Long id, @RequestBody UserRegisterDTO dto) {
        dto.setRole(Role.CLERK);
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @DeleteMapping("/clerk/{id}")
    public ResponseEntity<Void> deleteClerk(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Manager endpoints
    @PostMapping("/manager")
    public ResponseEntity<UserResponseDTO> registerManager(@Valid @RequestBody UserRegisterDTO dto) {
        dto.setRole(Role.MANAGER);
        return ResponseEntity.ok(userService.register(dto));
    }

    @GetMapping("/managers")
    public ResponseEntity<List<UserResponseDTO>> getAllManagers() {
        return ResponseEntity.ok(userService.getAllByRole(Role.MANAGER));
    }

    @PutMapping("/manager/{id}")
    public ResponseEntity<UserResponseDTO> updateManager(@PathVariable Long id, @RequestBody UserRegisterDTO dto) {
        dto.setRole(Role.MANAGER);
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @DeleteMapping("/manager/{id}")
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/customer")
    public ResponseEntity<List<UserResponseDTO>> getAllCustomer() {
        return ResponseEntity.ok(userService.getAllByRole(Role.CUSTOMER));
    }

    @PutMapping("/customer/{id}")
    public ResponseEntity<UserResponseDTO> updateCustomer(@PathVariable Long id, @RequestBody UserRegisterDTO dto) {
        dto.setRole(Role.CUSTOMER);
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<Void> deleteCstomer(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active-accounts")
    public ResponseEntity<List<BankAccountSummaryDTO>> getAllActiveAccounts() {
        return ResponseEntity.ok(userService.getAllActiveAccountsWithUserInfo());
    }

    @PutMapping("/account/{accountId}/status")
    public ResponseEntity<String> updateAccountStatus(
            @PathVariable Long accountId,
            @RequestParam("status") AccountStatus status) {
        userService.updateAccountStatus(accountId, status);
        return ResponseEntity.ok("Account status updated to: " + status.name());
    }
    
    // 🔍 View all audit logs
    @GetMapping
    public List<AuditLog> getAllLogs() {
        return auditLogService.getAllLogs();
    }
}
