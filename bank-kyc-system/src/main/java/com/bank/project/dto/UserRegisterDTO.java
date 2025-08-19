package com.bank.project.dto;


import com.bank.project.enums.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;   
    private String phoneno;
    private LocalDate dateOfBirth;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Role role;
}
