package com.bank.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class EmailDTO {
    @Email
    @NotBlank
    private String email;
}
