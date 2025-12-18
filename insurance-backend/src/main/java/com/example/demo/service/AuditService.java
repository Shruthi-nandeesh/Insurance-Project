package com.example.demo.service;


public interface AuditService {
    void log(String action, Long userId, String details);
}
