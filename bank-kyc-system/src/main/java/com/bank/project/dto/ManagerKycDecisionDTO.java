package com.bank.project.dto;

import com.bank.project.enums.KycStatus;

import lombok.Data;

@Data
public class ManagerKycDecisionDTO {
    private Long managerId;
    private boolean approved;
    private KycStatus kycStatus;  
    private String remarks;
}
