package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.OtpVerification;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);
    Optional<OtpVerification> findByEmailAndCodeAndUsedFalse(String email, String code);
}
