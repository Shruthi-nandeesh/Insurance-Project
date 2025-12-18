package com.example.demo.service;


public interface OtpService {
    String createAndSendOtp(String email) throws Exception;
    boolean verifyOtp(String email, String code);
}
