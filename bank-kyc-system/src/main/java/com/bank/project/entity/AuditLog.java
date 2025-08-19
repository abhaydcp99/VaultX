package com.bank.project.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String action;          
    @Column
    private String performedBy;     
    @Column
    private LocalDateTime timestamp;
    @Column
    private String targetEntity;    
    @Column
    private String details;         
}
