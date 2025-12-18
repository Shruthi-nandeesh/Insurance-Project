package com.example.demo.dto;



import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long policyId;

    @NotNull
    @Min(0)
    private Double amount;

    @NotBlank
    private String method;
}
