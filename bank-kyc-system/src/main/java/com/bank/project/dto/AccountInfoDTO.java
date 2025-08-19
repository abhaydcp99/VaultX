package com.bank.project.dto;

import java.math.BigDecimal;

import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountInfoDTO {
    private String accountNumber;
    private AccountType accountType;
    private String branchName;
    private String ifscCode;
    private BigDecimal balance;
    private KycStatus kycStatus;   
    private AccountStatus accountStatus;
}
