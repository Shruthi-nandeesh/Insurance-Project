package com.example.demo.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "claims")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Claim {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String claimNumber;

    @NotNull
    private LocalDate claimDate;

    @NotNull
    @Min(0)
    private Double claimAmount;

    @NotBlank
    private String status; // PENDING, APPROVED, REJECTED

    @Column(length = 2000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;
}
