package com.example.demo.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAll() { return ResponseEntity.ok(userService.getAllUsers()); }

    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) { return ResponseEntity.ok(userService.getUser(id)); }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User u) { return ResponseEntity.ok(userService.updateUser(id, u)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { userService.deleteUser(id); return ResponseEntity.ok("deleted"); }
}
