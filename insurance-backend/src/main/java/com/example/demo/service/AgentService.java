package com.example.demo.service;



import java.util.List;

import com.example.demo.entity.User;

public interface AgentService {
    List<User> getAllAgents();
    User createAgent(User agent);
}
