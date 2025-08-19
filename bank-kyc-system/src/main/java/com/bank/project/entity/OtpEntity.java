package com.bank.project.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String otp;
    @Column
    private LocalDateTime generatedAt;
    @Column
    private LocalDateTime expiryAt;
    @Column
    private boolean isUsed;
}
