package com.bank.project.repository;


import com.bank.project.entity.User;
import com.bank.project.enums.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole(Role role);

    boolean existsByEmail(String email);
	
}
