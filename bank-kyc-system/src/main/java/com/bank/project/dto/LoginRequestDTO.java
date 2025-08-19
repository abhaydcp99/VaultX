package com.bank.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    private String password;
    

//	public String getOtp() {
//		// TODO Auto-generated method stub
//		return null;
	
}
