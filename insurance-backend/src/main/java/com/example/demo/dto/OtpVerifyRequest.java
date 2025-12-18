package com.example.demo.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class OtpVerifyRequest {

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "OTP code is required")
    @Pattern(regexp = "^\\d{6}$", message = "OTP must be 6 digits")
    private String code;
}
