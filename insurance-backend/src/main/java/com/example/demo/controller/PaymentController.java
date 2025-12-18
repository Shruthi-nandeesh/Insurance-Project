package com.example.demo.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> pay(@Valid @RequestBody PaymentRequest req) { return ResponseEntity.ok(paymentService.makePayment(req)); }

    @GetMapping
    public ResponseEntity<List<Payment>> all() { return ResponseEntity.ok(paymentService.getAllPayments()); }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> get(@PathVariable Long id) { return ResponseEntity.ok(paymentService.getPayment(id)); }
}
