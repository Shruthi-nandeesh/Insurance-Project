package com.example.demo.service;


import java.util.List;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.entity.Payment;

public interface PaymentService {
    Payment makePayment(PaymentRequest req);
    List<Payment> getAllPayments();
    Payment getPayment(Long id);
}
