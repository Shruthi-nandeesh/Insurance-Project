package com.example.demo.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.PolicyRequest;
import com.example.demo.entity.Policy;
import com.example.demo.service.PolicyService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @PostMapping
    public ResponseEntity<Policy> create(@Valid @RequestBody PolicyRequest req) { return ResponseEntity.ok(policyService.createPolicy(req)); }

    @GetMapping
    public ResponseEntity<List<Policy>> getAll() { return ResponseEntity.ok(policyService.getAllPolicies()); }

    @GetMapping("/{id}")
    public ResponseEntity<Policy> get(@PathVariable Long id) { return ResponseEntity.ok(policyService.getPolicy(id)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { policyService.deletePolicy(id); return ResponseEntity.ok("deleted"); }
}
