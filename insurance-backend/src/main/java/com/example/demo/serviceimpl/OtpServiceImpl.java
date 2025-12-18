package com.example.demo.serviceimpl;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.entity.OtpVerification;
import com.example.demo.repository.OtpRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.OtpService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Value("${app.otp.expiration-minutes:5}")
    private int otpExpirationMinutes;

    @Value("${app.otp.max-attempts:5}")
    private int maxAttempts;

    private final Random random = new Random();

    private String generate6Digit() {
        int n = 100000 + random.nextInt(900000);
        return String.valueOf(n);
    }

    @Override
    public String createAndSendOtp(String email) throws Exception {
        String code = generate6Digit();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(otpExpirationMinutes);

        OtpVerification otp = OtpVerification.builder()
                .email(email)
                .code(code)
                .expiresAt(expiresAt)
                .attempts(0)
                .used(false)
                .build();
        otpRepository.save(otp);

        String subject = "Your registration OTP";
        String text = "Your OTP code is: " + code + "\nThis code expires in " + otpExpirationMinutes + " minutes.";
        emailService.sendSimpleEmail(email, subject, text);

        return code;
    }

    @Override
    public boolean verifyOtp(String email, String code) {
        Optional<OtpVerification> opt = otpRepository.findByEmailAndCodeAndUsedFalse(email, code);
        if (opt.isEmpty()) return false;

        OtpVerification otp = opt.get();
        if (otp.getUsed()) return false;
        if (otp.getAttempts() >= maxAttempts) return false;
        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        otp.setUsed(true);
        otpRepository.save(otp);
        return true;
    }
}
