package com.bank.project.controller;

import com.bank.project.dto.TransactionDTO;
import com.bank.project.entity.Transaction;
import com.bank.project.service.TransactionService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService txnService;

    @PostMapping("/deposit")
    public String deposit(@RequestParam String email, @RequestParam BigDecimal amount) {
        txnService.deposit(email, amount);
        return "Deposit successful";
    }

    @PostMapping("/withdraw")
    public String withdraw(@RequestParam String email, @RequestParam BigDecimal amount) {
        txnService.withdraw(email, amount);
        return "Withdrawal successful";
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam String fromEmail, @RequestParam String toEmail, @RequestParam BigDecimal amount) {
        txnService.transfer(fromEmail, toEmail, amount);
        return "Transfer successful";
    }
    
//    @GetMapping("/history")
//    public List<Transaction> getHistory(@RequestParam String email) {
//        return txnService.getTransactionHistory(email);
//    }
    
    
    @GetMapping("/history")
    public ResponseEntity<List<TransactionDTO>> getTransactionHistory(@RequestHeader("email") String email) {
        return ResponseEntity.ok(txnService.getTransactionHistory(email));
    }

    
    @GetMapping("/download")
    public void downloadStatement(@RequestParam String email, HttpServletResponse response) throws IOException {
        txnService.downloadStatement(email, response);
    }

}
