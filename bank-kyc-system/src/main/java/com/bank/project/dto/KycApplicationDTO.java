// com.bank.project.dto.KycApplicationDTO.java

package com.bank.project.dto;

import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KycApplicationDTO {
    private Long id;
    private String poiDocumentPath;
    private String poaDocumentPath;
    private KycStatus status;
    private String remarks;
    private LocalDateTime submittedAt;
    private AccountType accountType;

    @JsonIgnore   
    private Long userId;

    private String userName;
}
