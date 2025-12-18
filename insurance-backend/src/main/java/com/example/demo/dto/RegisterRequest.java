package com.example.demo.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String phone;

    private String street;
    private String city;
    private String state;
    private String zipCode;
}
