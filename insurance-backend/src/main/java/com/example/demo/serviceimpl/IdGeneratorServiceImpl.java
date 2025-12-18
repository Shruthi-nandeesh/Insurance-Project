package com.example.demo.serviceimpl;


import org.springframework.stereotype.Service;

import com.example.demo.service.IdGeneratorService;

import java.time.Year;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class IdGeneratorServiceImpl implements IdGeneratorService {

    private final AtomicLong counter = new AtomicLong(Instant.now().toEpochMilli() % 1000000);

    private String pad(long value, int width) {
        String s = Long.toString(value);
        if (s.length() >= width) return s;
        return "0".repeat(Math.max(0, width - s.length())) + s;
    }

    @Override
    public String generateUserId() {
        int year = Year.now().getValue();
        long seq = counter.incrementAndGet();
        return String.format("USR-%d-%s", year, pad(seq, 6));
    }

    @Override
    public String generatePolicyNumber() {
        int year = Year.now().getValue();
        long seq = counter.incrementAndGet();
        return String.format("POL-%d-%s", year, pad(seq, 6));
    }
}
