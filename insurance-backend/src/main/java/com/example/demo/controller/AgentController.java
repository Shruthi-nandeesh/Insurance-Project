package com.example.demo.controller;



import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.config.AgentServiceImpl;
import com.example.demo.entity.User;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
public class AgentController {

    private final AgentServiceImpl agentService;

    @GetMapping
    public ResponseEntity<List<User>> getAgents() {
        return ResponseEntity.ok(agentService.getAllAgents());
    }

    @PostMapping
    public ResponseEntity<User> createAgent(@RequestBody User agent) {
        return ResponseEntity.ok(agentService.createAgent(agent));
    }
}
