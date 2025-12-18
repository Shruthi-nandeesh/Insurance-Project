package com.example.demo.config;


import org.springframework.stereotype.Service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AgentServiceImpl {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public List<User> getAllAgents() {
        return userRepository.findByRoles_Name("AGENT");
    }

    public User createAgent(User agent) {
        Role r = roleRepository.findByName("AGENT").orElseThrow();
        agent.setRoles(Set.of(r));
        return userRepository.save(agent);
    }
}
