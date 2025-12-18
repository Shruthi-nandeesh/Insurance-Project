package com.example.demo.serviceimpl;


import com.example.demo.config.JwtService;
import com.example.demo.dto.*;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.IdGeneratorService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final IdGeneratorService idGeneratorService;

    @Override
    public JwtResponse register(RegisterRequest req) throws Exception {

        // --- CHECK IF EMAIL ALREADY EXISTS ---
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // --- CREATE NEW USER ---
        User user = new User();
        user.setUserId(idGeneratorService.generateUserId());
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setStreet(req.getStreet());
        user.setCity(req.getCity());
        user.setState(req.getState());
        user.setZipCode(req.getZipCode());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setStatus("PENDING");

        userRepository.save(user);

        // --- GENERATE JWT TOKEN ---
        String token = jwtService.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .message("Registered successfully")
                .build();
    }

    @Override
    public String resendOtp(String email) throws Exception {
        return "OTP sent again";
    }

    @Override
    public boolean verifyOtp(String email, String code) {
        return true;
    }

    @Override
    public JwtResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .message("Login successful")
                .build();
    }
}
