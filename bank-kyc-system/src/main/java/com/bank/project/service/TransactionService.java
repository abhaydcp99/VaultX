package com.bank.project.service;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

import com.bank.project.dto.TransactionDTO;
import com.bank.project.entity.BankAccount;
import com.bank.project.entity.Transaction;
import com.bank.project.enums.TransactionType;
import com.bank.project.repository.BankAccountRepository;
import com.bank.project.repository.TransactionRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final BankAccountRepository accountRepo;
    private final TransactionRepository txnRepo;

    public void deposit(String email, BigDecimal amount) {
        BankAccount account = accountRepo.findByUser_Email(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        if (account.getStatus() != com.bank.project.enums.AccountStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account is not active");
        }

        account.setBalance(account.getBalance().add(amount));
        accountRepo.save(account);

        Transaction txn = new Transaction(null, amount, TransactionType.DEPOSIT, "Deposit", null, account);
        txnRepo.save(txn);
    }

    public void withdraw(String email, BigDecimal amount) {
        BankAccount account = accountRepo.findByUser_Email(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        if (account.getBalance().compareTo(amount) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepo.save(account);

        Transaction txn = new Transaction(null, amount, TransactionType.WITHDRAW, "Withdraw", null, account);
        txnRepo.save(txn);
    }

    public void transfer(String fromEmail, String toEmail, BigDecimal amount) {
        BankAccount sender = accountRepo.findByUser_Email(fromEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sender account not found"));

        BankAccount receiver = accountRepo.findByUser_Email(toEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiver account not found"));

        if (sender.getBalance().compareTo(amount) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient funds");
        }

        sender.setBalance(sender.getBalance().subtract(amount));
        receiver.setBalance(receiver.getBalance().add(amount));
        accountRepo.save(sender);
        accountRepo.save(receiver);

        txnRepo.save(new Transaction(null, amount, TransactionType.TRANSFER, "Transfer to " + toEmail, null, sender));
        txnRepo.save(new Transaction(null, amount, TransactionType.TRANSFER, "Transfer from " + fromEmail, null, receiver));
    }
//    public List<Transaction> getTransactionHistory(String email) {
//        BankAccount account = accountRepo.findByUser_Email(email)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
//
//        return txnRepo.findByAccount(account);
//    }
    public List<TransactionDTO> getTransactionHistory(String email) {
        BankAccount account = accountRepo.findByUser_Email(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        List<Transaction> transactions = txnRepo.findByAccount(account);

        return transactions.stream()
                .map(txn -> new TransactionDTO(
                        txn.getId(),
                        txn.getAmount(),
                        txn.getType().name(),
                        txn.getDescription(),
                        txn.getTimestamp(),
                        txn.getAccount().getAccountNumber()
                ))
                .collect(Collectors.toList());
    }

    public void downloadStatement(String email, HttpServletResponse response) throws IOException, java.io.IOException {
        BankAccount account = accountRepo.findByUser_Email(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        List<Transaction> txns = txnRepo.findByAccount(account);

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"statement.csv\"");

        PrintWriter writer = response.getWriter();
        writer.println("ID,Type,Amount,Description,Timestamp");

        for (Transaction txn : txns) {
            writer.printf("%d,%s,%.2f,%s,%s%n",
                    txn.getId(),
                    txn.getType(),
                    txn.getAmount(),
                    txn.getDescription(),
                    txn.getTimestamp()
            );
        }

        writer.flush();
        writer.close();
    }
}
