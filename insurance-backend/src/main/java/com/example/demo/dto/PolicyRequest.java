package com.example.demo.dto;



import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PolicyRequest {
    @NotNull
    private Long insuranceTypeId;

    @NotNull
    private Long customerId;

    @NotNull @Min(0)
    private Double premiumAmount;

    @NotNull @Min(0)
    private Double coverageAmount;
}
