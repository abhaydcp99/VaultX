package com.bank.project.entity;

import java.math.BigDecimal;
import java.util.List;

import com.bank.project.enums.AccountStatus;
import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Column
    private String branchName;

    @Column
    private String ifscCode;

    @Column
    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    @Column
    private AccountStatus status;
    
    @Enumerated(EnumType.STRING)
    
    private KycStatus kycStatus = KycStatus.PENDING;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}





