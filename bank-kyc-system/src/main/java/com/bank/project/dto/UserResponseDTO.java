package com.bank.project.dto;

import com.bank.project.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneno;
    private Role role;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private boolean isVerified;  
}
