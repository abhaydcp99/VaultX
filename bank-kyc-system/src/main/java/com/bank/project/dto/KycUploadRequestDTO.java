package com.bank.project.dto;

import com.bank.project.enums.AccountType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KycUploadRequestDTO {

    @NotNull(message = "POI document is required")
    private MultipartFile poiDocument;  // 

    @NotNull(message = "POA document is required")
    private MultipartFile poaDocument;  // 

    @NotNull(message = "Account type is required")
    private AccountType accountType; // 
}
