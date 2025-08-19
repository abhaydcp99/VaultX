package com.bank.project.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.bank.project.enums.AccountType;
import com.bank.project.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})   
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String firstName;
    @Column(nullable=false)
    private String lastName;

    @Column(unique = true)
    private String email;
    @Column(nullable=false)
    private String password;
    @Column(nullable=false)
    private String phoneno;

    @Enumerated(EnumType.STRING)
    private Role role;
    @Column
    private LocalDate dateOfBirth;
    @Column(nullable=false)
    private String address;
    @Column(nullable=false)
    private String city;
    @Column(nullable=false)
    private String state;
    @Column(nullable=false)
    private String pincode;
    @Column
     private AccountType accountType;
    @Column
    private boolean isVerified = false;
   
    @Column(updatable = false)
    private LocalDate createdAt;
    @Column
    private LocalDate updatedAt;

    
    

}
