package com.example.demo.service;


import java.util.List;

import com.example.demo.dto.ClaimRequest;
import com.example.demo.entity.Claim;

public interface ClaimService {
    Claim fileClaim(ClaimRequest req);
    List<Claim> getAllClaims();
    Claim getClaim(Long id);
    Claim updateStatus(Long id, String status);
}
