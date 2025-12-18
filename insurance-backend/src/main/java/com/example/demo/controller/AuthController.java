package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public JwtResponse register(@RequestBody RegisterRequest req) throws Exception {
        return authService.register(req);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/resend-otp")
    public String resendOtp(@RequestParam String email) throws Exception {
        return authService.resendOtp(email);
    }

    @PostMapping("/verify-otp")
    public boolean verifyOtp(@RequestParam String email, @RequestParam String code) {
        return authService.verifyOtp(email, code);
    }
}
