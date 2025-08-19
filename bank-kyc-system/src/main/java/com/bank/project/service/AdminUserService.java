package com.bank.project.service;

import com.bank.project.dto.BankAccountSummaryDTO;
import com.bank.project.dto.UserRegisterDTO;
import com.bank.project.dto.UserResponseDTO;
import com.bank.project.entity.BankAccount;
import com.bank.project.entity.User;
import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.Role;
import com.bank.project.repository.BankAccountRepository;
import com.bank.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;
    private final BankAccountRepository bankAccountRepository;

    // Register a new user (Manager/Clerk)
    public UserResponseDTO register(UserRegisterDTO dto) {
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

        // Audit log
        auditLogService.log(
                "Registered new " + dto.getRole(),
                "ADMIN",
                "User",
                "Created user: " + savedUser.getEmail()
        );

        return mapToResponse(savedUser);
    }

    // Get all users by role
    public List<UserResponseDTO> getAllByRole(Role role) {
        return userRepository.findAllByRole(role)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Update user
    public UserResponseDTO update(Long id, UserRegisterDTO dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneno(dto.getPhoneno());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setAddress(dto.getAddress());
        user.setPincode(dto.getPincode());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setRole(dto.getRole());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        User updatedUser = userRepository.save(user);

        // Audit log
        auditLogService.log(
                "Updated user: " + updatedUser.getEmail(),
                "ADMIN",
                "User",
                "Updated user ID: " + id
        );

        return mapToResponse(updatedUser);
    }

    // Delete user
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.deleteById(id);

        // Audit log
        auditLogService.log(
                "Deleted user: " + user.getEmail(),
                "ADMIN",
                "User",
                "Deleted user ID: " + id
        );
    }

    // Mapper
    private UserResponseDTO mapToResponse(User user) {
        return UserResponseDTO.builder()
            .id(user.getId())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .email(user.getEmail())
            .phoneno(user.getPhoneno())         // ✅ include phoneno
            .address(user.getAddress())         // ✅ include address
            .pincode(user.getPincode())         // ✅ include pincode
            .role(user.getRole())
            .city(user.getCity())
            .state(user.getState())
            .isVerified(user.isVerified())
            .build();
    }
    

    public List<BankAccountSummaryDTO> getAllActiveAccountsWithUserInfo() {
        List<BankAccount> accounts = bankAccountRepository.findByStatus(AccountStatus.ACTIVE);

        return accounts.stream().map(account -> {
            String holderName = account.getUser() != null
                    ? account.getUser().getFirstName() + " " + account.getUser().getLastName()
                    : "Unknown";

            String email = account.getUser() != null ? account.getUser().getEmail() : "N/A";

            return BankAccountSummaryDTO.builder()
                    .accountNumber(account.getAccountNumber())
                    .accountType(account.getAccountType())
                    .branchName(account.getBranchName())
                    .ifscCode(account.getIfscCode())
                    .balance(account.getBalance())
                    .kycStatus(account.getKycStatus())
                    .accountStatus(account.getStatus())
                    .holderName(holderName)
                    .email(email)
                    .build();
        }).collect(Collectors.toList());
    }
    
    public void updateAccountStatus(Long accountId, AccountStatus status) {
        BankAccount account = bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Bank account not found"));

        account.setStatus(status);
        bankAccountRepository.save(account);

        // Optionally log or notify
        auditLogService.log(
            "Changed account status to " + status,
            "ADMIN",
            "BankAccount",
            "Updated account ID: " + accountId
        );
    }


}
