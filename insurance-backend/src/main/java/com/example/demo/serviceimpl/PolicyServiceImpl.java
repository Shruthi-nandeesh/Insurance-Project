package com.example.demo.serviceimpl;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.dto.PolicyRequest;
import com.example.demo.entity.*;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.*;
import com.example.demo.service.IdGeneratorService;
import com.example.demo.service.PolicyService;


@Service
@RequiredArgsConstructor
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepo;
    private final UserRepository userRepo;
    private final InsuranceTypeRepository typeRepo;
    private final IdGeneratorService idGeneratorService;

    @Override
    public Policy createPolicy(PolicyRequest req) {
        User user = userRepo.findById(req.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        InsuranceType type = typeRepo.findById(req.getInsuranceTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Insurance type not found"));
        Policy p = Policy.builder()
                .policyNumber(idGeneratorService.generatePolicyNumber())
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusYears(1))
                .premiumAmount(req.getPremiumAmount())
                .coverageAmount(req.getCoverageAmount())
                .customer(user)
                .insuranceType(type)
                .build();
        return policyRepo.save(p);
    }

    @Override
    public List<Policy> getAllPolicies() { return policyRepo.findAll(); }

    @Override
    public Policy getPolicy(Long id) {
        return policyRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Policy not found"));
    }

    @Override
    public void deletePolicy(Long id) { policyRepo.deleteById(id); }
}
