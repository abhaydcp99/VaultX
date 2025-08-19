package com.bank.project.repository;

import com.bank.project.entity.BankAccount;
import com.bank.project.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(Long accountId);
    List<Transaction> findByAccount(BankAccount account);


}
