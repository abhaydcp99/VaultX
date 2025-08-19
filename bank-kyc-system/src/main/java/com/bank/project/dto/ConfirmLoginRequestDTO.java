package com.bank.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmLoginRequestDTO {

    @Email
    @NotBlank
    private String email;
 

    @NotBlank
    private String otp;
}
