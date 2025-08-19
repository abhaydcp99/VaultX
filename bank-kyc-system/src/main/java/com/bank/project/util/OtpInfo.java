package com.bank.project.util;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OtpInfo {
    private String otp;
    private LocalDateTime expiryTime;
	public LocalDateTime getGeneratedAt() {
		// TODO Auto-generated method stub
		return null;
	}
}
