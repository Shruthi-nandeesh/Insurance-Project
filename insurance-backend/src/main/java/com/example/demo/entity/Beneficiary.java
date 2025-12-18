package com.example.demo.entity;




import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "beneficiaries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Beneficiary {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String beneficiaryName;

    private String relationship;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private Double sharePercentage;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;
}
