package com.example.demo.dto;



import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClaimRequest {
    @NotNull
    private Long policyId;

    @NotNull
    private Double claimAmount;

    @NotBlank
    private String description;
}
