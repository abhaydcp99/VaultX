package com.bank.project.dto;

import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder
public class BankAccountSummaryDTO {
    private String accountNumber;
    private AccountType accountType;
    private String branchName;
    private String ifscCode;
    private BigDecimal balance;
    private KycStatus kycStatus;
    private AccountStatus accountStatus;

    private String holderName;
    private String email;
}
