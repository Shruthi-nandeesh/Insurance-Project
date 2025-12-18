package com.example.demo.service;



import java.util.List;

import com.example.demo.dto.PolicyRequest;
import com.example.demo.entity.Policy;

public interface PolicyService {
    Policy createPolicy(PolicyRequest req);
    List<Policy> getAllPolicies();
    Policy getPolicy(Long id);
    void deletePolicy(Long id);
}
