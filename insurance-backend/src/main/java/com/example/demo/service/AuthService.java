package com.example.demo.service;

import com.example.demo.dto.*;

public interface AuthService {
    JwtResponse register(RegisterRequest req) throws Exception;
    String resendOtp(String email) throws Exception;
    boolean verifyOtp(String email, String code);
    JwtResponse login(LoginRequest req);
}
