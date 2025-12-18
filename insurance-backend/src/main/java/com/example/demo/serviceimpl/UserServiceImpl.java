package com.example.demo.serviceimpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public User getUser(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User updateUser(Long id, User u) {
        User ex = getUser(id);

        ex.setFullName(u.getFullName());
        ex.setEmail(u.getEmail());
        ex.setPhone(u.getPhone());

        // Address fields (corrected)
        ex.setStreet(u.getStreet());
        ex.setCity(u.getCity());
        ex.setState(u.getState());
        ex.setZipCode(u.getZipCode());

        ex.setGender(u.getGender());
        ex.setDateOfBirth(u.getDateOfBirth());
        ex.setStatus(u.getStatus());
        ex.setProfileImageUrl(u.getProfileImageUrl());

        return repo.save(ex);
    }

    @Override
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}
