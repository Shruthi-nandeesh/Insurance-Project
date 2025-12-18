package com.example.demo.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.InsuranceType;

import java.util.Optional;

public interface InsuranceTypeRepository extends JpaRepository<InsuranceType, Long> {
    Optional<InsuranceType> findByName(String name);
}
