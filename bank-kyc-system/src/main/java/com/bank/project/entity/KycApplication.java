package com.bank.project.entity;

import com.bank.project.enums.AccountType;
import com.bank.project.enums.KycStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})    
public class KycApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    // PAN or other PoI
    private String poiDocumentPath;
    @Column
    // Aadhaar or other PoA
    private String poaDocumentPath;

    @Enumerated(EnumType.STRING)
    private KycStatus status;
    @Column
    private String remarks; 
    @Column
    private LocalDateTime submittedAt;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user; 

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clerk_id")
    private User clerk; 

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "manager_id")
    private User manager; 
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;


}
