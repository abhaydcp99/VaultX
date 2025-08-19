package com.bank.project.repository;

import com.bank.project.entity.BankAccount;
import com.bank.project.entity.User;
import com.bank.project.enums.AccountStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    Optional<BankAccount> findByUser(User user);
    Optional<BankAccount> findByUser_Email(String email);
    List<BankAccount> findByStatus(AccountStatus status);
    Optional<BankAccount> findByUser_Id(Long userId);


}
