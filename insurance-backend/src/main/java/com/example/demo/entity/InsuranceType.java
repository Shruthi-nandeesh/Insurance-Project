package com.example.demo.entity;




import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "insurance_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsuranceType {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String name;

    private String description;
}
