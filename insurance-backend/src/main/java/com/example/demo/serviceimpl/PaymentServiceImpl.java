package com.example.demo.serviceimpl;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Policy;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.PolicyRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.PaymentService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepo;
    private final PolicyRepository policyRepo;
    private final UserRepository userRepo;

    @Override
    public Payment makePayment(PaymentRequest req) {
        User u = userRepo.findById(req.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Policy p = policyRepo.findById(req.getPolicyId()).orElseThrow(() -> new ResourceNotFoundException("Policy not found"));
        Payment pay = Payment.builder()
                .amount(req.getAmount())
                .method(req.getMethod())
                .transactionId(UUID.randomUUID().toString())
                .status("SUCCESS")
                .paymentTime(LocalDateTime.now())
                .policy(p)
                .user(u)
                .build();
        return paymentRepo.save(pay);
    }

    @Override
    public List<Payment> getAllPayments() { return paymentRepo.findAll(); }

    @Override
    public Payment getPayment(Long id) { return paymentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Payment not found")); }
}
