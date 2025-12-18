package com.example.demo.serviceimpl;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AuditLog;
import com.example.demo.entity.User;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuditService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private final AuditLogRepository auditRepo;
    private final UserRepository userRepo;

    @Override
    public void log(String action, Long userId, String details) {
        User u = userRepo.findById(userId).orElse(null);
        AuditLog a = AuditLog.builder()
                .action(action)
                .timestamp(LocalDateTime.now())
                .user(u)
                .details(details)
                .build();
        auditRepo.save(a);
    }
}
