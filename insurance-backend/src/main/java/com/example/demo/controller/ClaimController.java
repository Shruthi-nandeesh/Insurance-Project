package com.example.demo.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ClaimRequest;
import com.example.demo.entity.Claim;
import com.example.demo.service.ClaimService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping
    public ResponseEntity<Claim> file(@Valid @RequestBody ClaimRequest req) { return ResponseEntity.ok(claimService.fileClaim(req)); }

    @GetMapping
    public ResponseEntity<List<Claim>> all() { return ResponseEntity.ok(claimService.getAllClaims()); }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> get(@PathVariable Long id) { return ResponseEntity.ok(claimService.getClaim(id)); }

    @PutMapping("/{id}/status")
    public ResponseEntity<Claim> updateStatus(@PathVariable Long id, @RequestParam String status) { return ResponseEntity.ok(claimService.updateStatus(id, status)); }
}
