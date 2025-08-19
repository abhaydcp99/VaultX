package com.bank.project.repository;

import com.bank.project.entity.KycApplication;
import com.bank.project.entity.User;
import com.bank.project.enums.KycStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KycApplicationRepository extends JpaRepository<KycApplication, Long> {
    Optional<KycApplication> findByUser(User user);
    Optional<KycApplication> findTopByUserOrderBySubmittedAtDesc(User user);
    List<KycApplication> findByStatusAndClerkIsNotNullAndManagerIsNull(KycStatus status);
	List<KycApplication> findByStatus(KycStatus status);
	Optional<KycApplication> findTopByUserAndStatusOrderBySubmittedAtDesc(User user, KycStatus status);

        //List<KycApplication> findByStatus(KycStatus status);
    

}
