package com.example.demo.serviceimpl;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClaimRequest;
import com.example.demo.entity.Claim;
import com.example.demo.entity.Policy;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ClaimRepository;
import com.example.demo.repository.PolicyRepository;
import com.example.demo.service.ClaimService;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClaimServiceImpl implements ClaimService {

    private final ClaimRepository claimRepo;
    private final PolicyRepository policyRepo;

    @Override
    public Claim fileClaim(ClaimRequest req) {
        Policy policy = policyRepo.findById(req.getPolicyId())
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found"));
        Claim c = Claim.builder()
                .claimNumber("CLM" + System.currentTimeMillis())
                .claimDate(LocalDate.now())
                .claimAmount(req.getClaimAmount())
                .description(req.getDescription())
                .status("PENDING")
                .policy(policy)
                .build();
        return claimRepo.save(c);
    }

    @Override
    public List<Claim> getAllClaims() { return claimRepo.findAll(); }

    @Override
    public Claim getClaim(Long id) { return claimRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Claim not found")); }

    @Override
    public Claim updateStatus(Long id, String status) {
        Claim c = getClaim(id);
        c.setStatus(status);
        return claimRepo.save(c);
    }
}
